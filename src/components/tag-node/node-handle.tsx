import { IconCircleDashed } from "@tabler/icons-react";
import { type Connection, type Edge, Handle, type HandleProps } from "@xyflow/react";
import type { PellaNodeEntityType } from "../../tags";
import { nodeParameterClasses } from "./colours";

interface NodeParameterProps extends HandleProps {
	label: string;
	entityType: PellaNodeEntityType;
}

const validateConnection = (edge: Connection | Edge): boolean => {
	return edge.sourceHandle === edge.targetHandle;
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
	const paramClasses = nodeParameterClasses[props.entityType];

	return (
		<NodeHandle type="target" isValidConnection={validateConnection} id={props.entityType.toString()} {...props}>
			<div className="flex flex-row items-center align-middle text-white space-x-2 pointer-events-none">
				{/* {(connected && <IconCircle className="w-4 h-4 fill-white stroke-none" />) || ( */}
				<IconCircleDashed className={`w-4 h-4 stroke-2 ${paramClasses.stroke}`} />
				{/* // )} */}
				<span className="text-xs">{label}</span>
			</div>
		</NodeHandle>
	);
};

export const NodeOutputHandle = ({ children, label, ...props }: NodeParameterProps) => {
	const paramClasses = nodeParameterClasses[props.entityType];

	return (
		<NodeHandle type="source" isValidConnection={validateConnection} id={props.entityType.toString()} {...props}>
			<div className="flex flex-row items-center align-middle text-white gap-2 pointer-events-none">
				<span className="text-xs text-right">{label}</span>
				{/* {(connected && <IconCircle className="w-4 h-4 fill-white stroke-none" />) || ( */}
				<IconCircleDashed className={`w-4 h-4 stroke-2 ${paramClasses.stroke}`} />
				{/* )} */}
			</div>
		</NodeHandle>
	);
};
