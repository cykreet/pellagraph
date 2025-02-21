import { IconFunction, IconTriangle } from "@tabler/icons-react";
import { type Edge, type NodeProps, Position, useEdges, useUpdateNodeInternals } from "@xyflow/react";
import { useEffect, useState } from "react";
import { PellaExecutionType, type PellaTag } from "../../tags";
import { NodeHandle, NodeInputHandle, NodeOutputHandle } from "./node-handle";

export type TagNodeProps = NodeProps & { data: PellaTag };

export const TagNode = ({ data, id }: TagNodeProps) => {
	const [connectedEdges, setConnectedEdges] = useState<Edge[]>();
	const edges = useEdges();
	useEffect(() => {
		const nodeEdges = edges?.filter((edge) => edge.source === id || edge.target === id);
		setConnectedEdges(nodeEdges);
	}, [edges, id]);

	const isFunction = data.executionType === PellaExecutionType.Function;
	const isPrimary = [PellaExecutionType.Function, PellaExecutionType.Setter].includes(data.executionType);
	// todo: getters colour should come from entity type colours
	const tagBackground = isFunction ? "bg-blue-500" : "bg-green-500";
	const tagColour = isFunction ? "text-blue-200" : "text-green-200";

	return (
		<div className="flex max-w-sm">
			<div className="text-left flex min-w-60 flex-col bg-zinc-800/80 overflow-hidden rounded-md space-y-4">
				<div className={`flex flex-col py-2 px-4 ${tagBackground}`}>
					<span
						className={`font-medium inline-flex items-center align-middle gap-2 ${tagColour}`}
						title={data.shortDescription}
					>
						{isFunction && <IconFunction className="w-5 h-5 stroke-[1.5px]" />}
						{data.name}
					</span>
				</div>
				<div className="px-4 h-full mb-4 space-y-2">
					{isPrimary && (
						<div className="flex flex-row justify-between w-full">
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
							<NodeHandle
								type="source"
								position={Position.Right}
								isValidConnection={(edge) => edge.targetHandle === "invoke"}
								className="justify-end"
								id="exit"
							>
								{(connectedEdges?.some((edge) => edge.targetHandle === "invoke" && edge.source === id) && (
									<IconTriangle className="w-4 h-4 fill-white stroke-none rotate-90" />
								)) || <IconTriangle className="w-4 h-4 stroke-white stroke-2 rotate-90" />}
							</NodeHandle>
						</div>
					)}
					<div className="flex flex-row justify-between w-full space-x-4">
						<div className="flex flex-col space-y-2">
							{data.inputParameters?.map((param) => (
								<NodeInputHandle
									id={param.name}
									key={param.name}
									label={param.name}
									connected={connectedEdges?.some((edge) => edge.targetHandle === param.name)}
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
									connected={connectedEdges?.some((edge) => edge.sourceHandle === param.name)}
									entityType={param.type}
									position={Position.Right}
								/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
