import { IconCircleDashed } from "@tabler/icons-react";
import { type HandleProps, Handle } from "@xyflow/react";
import { PellaEntityType, PellaTagType } from "../../tags";

interface NodeParameterProps extends HandleProps {
	label: string;
	entityType: PellaEntityType | "string" | "number" | "boolean";
}

const nodeParameterColours = {
	[PellaEntityType.Channel]: "blue-500",
	[PellaEntityType.User]: "purple-500",
	[PellaEntityType.Array]: "yellow-500",
	string: "green-500",
	number: "amber-500",
	boolean: "red-500",
};

export const NodeHandle = ({ children, ...rest }: HandleProps) => {
	return (
		<Handle
			className="flex! transform-none! static! items-center h-4! left-0! top-0! w-4! border-none! bg-transparent! align-middle"
			{...rest}
		>
			<div className="pointer-events-none">{children}</div>
		</Handle>
	);
};

export const NodeInputHandle = ({ children, label, ...props }: NodeParameterProps) => {
	const paramColour = nodeParameterColours[props.entityType];

	return (
		<NodeHandle type="target" {...props}>
			<div className="flex flex-row items-center align-middle text-white gap-2 pointer-events-none">
				{/* {(connected && <IconCircle className="w-4 h-4 fill-white stroke-none" />) || ( */}
				<IconCircleDashed className="w-4 h-4 stroke-2" style={{ stroke: `var(--color-${paramColour})` }} />
				{/* // )} */}
				<span className="text-xs">{label}</span>
			</div>
		</NodeHandle>
	);
};

export const NodeOutputHandle = ({ children, label, ...props }: NodeParameterProps) => {
	const paramColour = nodeParameterColours[props.entityType];

	return (
		<NodeHandle type="source" {...props}>
			<div className="flex flex-row items-center align-middle text-white gap-2 pointer-events-none">
				{/* <span className="text-sm">{label}</span> */}
				{/* {(connected && <IconCircle className="w-4 h-4 fill-white stroke-none" />) || ( */}
				<IconCircleDashed className="w-4 h-4 stroke-2" style={{ stroke: `var(--color-${paramColour})` }} />
				{/* )} */}
			</div>
		</NodeHandle>
	);
};
