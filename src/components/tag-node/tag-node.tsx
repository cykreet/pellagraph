import { IconFunction, IconTriangle } from "@tabler/icons-react";
import { type NodeProps, Position } from "@xyflow/react";
import { type PellaTag, PellaTagType } from "../../tags";
import { NodeHandle, NodeInputHandle, NodeOutputHandle } from "./node-handle";

export type TagNodeProps = NodeProps & { data: PellaTag };

export const TagNode = ({ data }: TagNodeProps) => {
	const isFunction = data.executionType === PellaTagType.Function;
	const isPrimary = [PellaTagType.Function, PellaTagType.Setter].includes(data.executionType);
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
						<div className="flex flex-row justify-between">
							<NodeHandle
								type="target"
								position={Position.Left}
								isValidConnection={(edge) => edge.sourceHandle === "exit"}
								id="invoke"
							>
								<IconTriangle className="w-4 h-4 fill-white stroke-none rotate-90" />
							</NodeHandle>
							<NodeHandle
								type="source"
								position={Position.Right}
								isValidConnection={(edge) => edge.targetHandle === "invoke"}
								id="exit"
							>
								<IconTriangle className="w-4 h-4 fill-white stroke-none rotate-90" />
							</NodeHandle>
						</div>
					)}
					<div className="flex flex-row justify-between w-full mr-30">
						<div className="flex flex-col space-y-1 h-1/2">
							{data.inputParameters?.map((param) => (
								<NodeInputHandle
									id={param.name}
									key={param.name}
									label={param.name}
									entityType={param.type}
									position={Position.Left}
								/>
							))}
						</div>
						<div className="flex flex-col space-y-1 h-1/2">
							{data.outputParameters?.map((param) => (
								<NodeOutputHandle
									key={param.name}
									label={param.name}
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
