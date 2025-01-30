import { IconFunction, IconTriangle } from "@tabler/icons-react";
import { Position, type NodeProps } from "@xyflow/react";
import { NodeHandle, NodeInputHandle, NodeOutputHandle } from "./node-handle";
import { PellaEntityType, PellaTagType } from "../../tags";

export interface TagNodeData {
	name: string;
	shortDescription: string;
	tagType: PellaTagType;
	parameters?: [];
}

export type TagNodeProps = NodeProps & { data: TagNodeData };

const tagNodeColours = {
	[PellaTagType.Getter]: "green",
	[PellaTagType.Setter]: "blue",
	[PellaTagType.Void]: "red",
};

export const TagNode = ({ data }: TagNodeProps) => {
	const tagColour = tagNodeColours[data.tagType];

	return (
		<div className="flex min-h-42">
			<div className="text-left flex flex-col bg-zinc-800/80 overflow-hidden rounded-md space-y-4">
				<div className="flex flex-col p-4" style={{ background: `var(--color-${tagColour}-500)` }}>
					<span
						className="font-medium inline-flex items-center align-middle gap-2"
						style={{ color: `var(--color-${tagColour}-200)` }}
					>
						<IconFunction className="w-5 h-5 stroke-[1.5px]" />
						{data.name}
					</span>
					<span className="text-sm opacity-50">{data.shortDescription}</span>
				</div>
				<div className="flex flex-row justify-between px-4 h-full mb-4">
					<div className="flex flex-col space-y-2">
						<NodeHandle type="target" position={Position.Left} id="1">
							<IconTriangle className="w-4 h-4 fill-white stroke-none rotate-90" />
						</NodeHandle>
						<NodeInputHandle label="User" entityType={PellaEntityType.User} position={Position.Left} id="2" />
						<NodeInputHandle label="Channel" entityType={PellaEntityType.Channel} position={Position.Left} id="3" />
						<NodeInputHandle label="Message" entityType="string" position={Position.Left} id="4" />
					</div>
					<div className="flex flex-col space-y-2">
						<NodeHandle type="source" position={Position.Right} id="5">
							<IconTriangle className="w-4 h-4 fill-white stroke-none rotate-90" />
						</NodeHandle>
						<NodeOutputHandle label="Array" entityType={PellaEntityType.Array} position={Position.Right} id="6" />
					</div>
				</div>
			</div>
		</div>
	);
};
