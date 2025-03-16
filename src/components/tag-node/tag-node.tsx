import { IconFunction, IconTriangle } from "@tabler/icons-react";
import { type Edge, type NodeProps, Position, useEdges } from "@xyflow/react";
import { useEffect, useState } from "react";
import { create } from "zustand";
import { PellaEntityType, PellaExecutionType, type PellaTag, type SystemTag, TagType } from "../../tags";
import { nodeEntityClasses } from "./colours";
import { NodeHandle, NodeInputHandle, NodeOutputHandle } from "./node-handle";

export type TagNodeProps = NodeProps & { data: PellaTag | SystemTag };

const isPellaTag = (tag: PellaTag | SystemTag): tag is PellaTag => {
	return tag.type === TagType.Pella;
};

const isSystemTag = (tag: PellaTag | SystemTag): tag is SystemTag => {
	return tag.type === TagType.System;
};

interface PellaParametersProps {
	data: PellaTag;
	id: string;
	connectedEdges?: Edge[];
}

export const useNodeInputParams = create(() => ({ inputParams: new Map<string, { name: string; value: any }[]>() }));

const PellaParameters = ({ data, id, connectedEdges }: PellaParametersProps) => {
	return (
		<div className="flex flex-row justify-between w-full space-x-4">
			<div className="flex flex-col space-y-2">
				{data.inputParameters?.map((param) => (
					<NodeInputHandle
						id={param.name}
						key={param.name}
						label={param.name}
						connected={connectedEdges?.some((edge) => edge.targetHandle === param.name && edge.target === id)}
						input={
							useNodeInputParams
								.getState()
								.inputParams.get(id)
								?.find((p) => p.name === param.pellaName)?.value
						}
						onInputChange={(value) =>
							useNodeInputParams.setState((prev) => {
								const nodeInputParams = prev.inputParams.get(id) || [];
								const inputParam = nodeInputParams.find((p) => p.name === param.pellaName);
								if (inputParam) {
									inputParam.value = value;
									nodeInputParams[nodeInputParams.indexOf(inputParam)] = inputParam;
								} else nodeInputParams.push({ name: param.pellaName, value });
								return { inputParams: new Map(prev.inputParams).set(id, nodeInputParams) };
							})
						}
						entityType={param.type}
						position={Position.Left}
					/>
				))}
			</div>
			<div className="flex flex-col space-y-2">
				{data.outputParameters?.map((param) => (
					<NodeOutputHandle
						id={param.name}
						key={param.name}
						label={param.name}
						connected={connectedEdges?.some((edge) => edge.sourceHandle === param.name && edge.source === id)}
						entityType={param.type}
						position={Position.Right}
					/>
				))}
			</div>
		</div>
	);
};

export const TagNode = ({ data, id }: TagNodeProps) => {
	const [connectedEdges, setConnectedEdges] = useState<Edge[]>();
	const edges = useEdges();

	useEffect(() => {
		const nodeEdges = edges?.filter((edge) => edge.source === id || edge.target === id);
		setConnectedEdges(nodeEdges);
	}, [edges, id]);

	const isFunction = data.executionType === PellaExecutionType.Function;
	const isInvoker = isSystemTag(data) && data.invoker === true;
	const tagClasses = isFunction
		? nodeEntityClasses[PellaEntityType.Channel]
		: nodeEntityClasses[(isPellaTag(data) && data.outputParameters?.[0]?.type) || PellaEntityType.Channel];

	return (
		<div className="flex max-w-2xs">
			<div
				className={`flex flex-col rounded-md border-2 border-zinc-700 p-2 space-y-2 bg-zinc-800/95 ${tagClasses.stroke}`}
			>
				<div className="flex flex-col space-y-2">
					<div className="flex flex-row items-center space-x-2">
						{isFunction ? (
							<IconFunction className={`w-4 h-4 ${tagClasses.stroke}`} />
						) : (
							<IconTriangle className={`w-4 h-4 ${tagClasses.stroke}`} />
						)}
						<span className="text-sm text-white">{data.name}</span>
					</div>
					<span className="text-xs text-zinc-400">{data.shortDescription}</span>
					{isFunction && (
						<div className="flex flex-row justify-between w-full">
							{(!isInvoker || isPellaTag(data)) && (
								<NodeHandle
									type="target"
									position={Position.Left}
									isValidConnection={(edge) => edge.sourceHandle === "exit"}
									id="invoke"
								>
									{(connectedEdges?.some((edge) => edge.sourceHandle === "exit" && edge.target === id) && (
										<IconTriangle className="w-4 h-4 fill-white stroke-none rotate-90" />
									)) || <IconTriangle className="w-4 h-4 stroke-white stroke-2 rotate-90" />}
								</NodeHandle>
							)}
							<NodeHandle
								type="source"
								position={Position.Right}
								isValidConnection={(edge) => edge.targetHandle === "invoke"}
								className="justify-end ml-auto"
								id="exit"
							>
								{(connectedEdges?.some((edge) => edge.targetHandle === "invoke" && edge.source === id) && (
									<IconTriangle className="w-4 h-4 fill-white stroke-none rotate-90" />
								)) || <IconTriangle className="w-4 h-4 stroke-white stroke-2 rotate-90" />}
							</NodeHandle>
						</div>
					)}
					{isPellaTag(data) && <PellaParameters data={data} id={id} connectedEdges={connectedEdges} />}
				</div>
			</div>
		</div>
	);
};
