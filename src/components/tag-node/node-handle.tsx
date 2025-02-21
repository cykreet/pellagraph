import { IconCircle, IconCircleDashed } from "@tabler/icons-react";
import { Handle, type HandleProps } from "@xyflow/react";
import clsx from "clsx";
import type { PellaNodeEntityType } from "../../tags";
import { nodeParameterClasses } from "./colours";

interface NodeParameterProps extends HandleProps {
	label: string;
	entityType: PellaNodeEntityType;
	hasInput?: boolean;
	input?: string;
	connected?: boolean;
}

export const NodeHandle = ({
	children,
	className,
	hasInput,
	inputDisabled,
	input,
	...rest
}: HandleProps & { hasInput?: boolean; input?: string; inputDisabled?: boolean }) => {
	const classes = clsx(
		"flex! transform-none! static! h-4! space-x-2 left-0! top-0! w-full! border-none! bg-transparent!",
		className,
	);

	// todo: connection snapping not working from source to target
	return (
		<Handle className={classes} {...rest}>
			<div className="pointer-events-none">{children}</div>
			{hasInput && (
				<input
					type="text"
					value={input}
					disabled={inputDisabled}
					className="bg-zinc-900 border-1 text-xs px-1 text-zinc-300 border-zinc-600 max-w-18 rounded disabled:text-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-800"
				/>
			)}
		</Handle>
	);
};

export const NodeInputHandle = ({ children, label, connected, ...props }: NodeParameterProps) => {
	const paramClasses = nodeParameterClasses[props.entityType];

	return (
		<NodeHandle type="target" id={props.entityType.toString()} hasInput inputDisabled={connected} {...props}>
			<div className="flex flex-row items-center align-middle text-white space-x-2 pointer-events-none">
				{(connected && (
					<IconCircle
						className={`w-4 h-4 ${paramClasses.fill} stroke-5 ${paramClasses.stroke}`}
						style={{ strokeOpacity: "25%" }}
					/>
				)) || <IconCircleDashed className={`w-4 h-4 stroke-2 ${paramClasses.stroke}`} />}
				<span className="text-xs">{label}</span>
			</div>
		</NodeHandle>
	);
};

export const NodeOutputHandle = ({ children, label, connected, ...props }: Omit<NodeParameterProps, "input">) => {
	const paramClasses = nodeParameterClasses[props.entityType];

	return (
		<NodeHandle type="source" id={props.entityType.toString()} className="justify-end" {...props}>
			<div className="flex flex-row items-center align-middle text-white gap-2 pointer-events-none">
				<span className="text-xs text-right">{label}</span>
				{(connected && (
					<IconCircle
						className={`w-4 h-4 ${paramClasses.fill} stroke-5 ${paramClasses.stroke}`}
						style={{ strokeOpacity: "25%" }}
					/>
				)) || <IconCircleDashed className={`w-4 h-4 stroke-2 ${paramClasses.stroke}`} />}
			</div>
		</NodeHandle>
	);
};
