import { IconCircle, IconCircleDashed } from "@tabler/icons-react";
import { Handle, Position, type HandleProps } from "@xyflow/react";
import clsx from "clsx";
import type { PellaEntityType } from "../../tags";
import { nodeEntityClasses } from "./colours";
import { useState } from "react";

interface NodeParameterProps extends HandleProps {
	label: string;
	entityType: PellaEntityType;
	hasInput?: boolean;
	input?: string;
	connected?: boolean;
	onInputChange?: (value: string) => void;
}

export const NodeHandle = ({
	children,
	className,
	hasInput,
	inputDisabled,
	input,
	onInputChange,
	...rest
}: HandleProps & {
	hasInput?: boolean;
	input?: string;
	inputDisabled?: boolean;
	onInputChange?: (value: string) => void;
}) => {
	const [inputValue, setInputValue] = useState(input ?? "");
	const classes = clsx("relative flex flex-row items-center", className);

	return (
		<div className={classes}>
			<div className="relative">
				{children}
				<Handle className="!absolute !h-4 !w-4 !border-none !bg-transparent" {...rest} />
			</div>
			{hasInput && (
				<input
					type="text"
					value={inputValue}
					disabled={inputDisabled}
					className="bg-zinc-900 ml-2 border-1 text-xs px-1 text-zinc-300 border-zinc-600 max-w-18 rounded disabled:text-zinc-400 disabled:cursor-not-allowed disabled:bg-zinc-800"
					onChange={(event) => setInputValue(event.target.value)}
					onBlur={() => onInputChange?.(inputValue)}
				/>
			)}
		</div>
	);
};

export const NodeInputHandle = ({ children, label, connected, position, ...props }: NodeParameterProps) => {
	const entityClasses = nodeEntityClasses[props.entityType];

	return (
		<div className="flex flex-row items-center">
			<NodeHandle type="target" position={Position.Left} hasInput inputDisabled={connected} {...props}>
				<div className="flex flex-row items-center text-white pointer-events-none">
					<div className="relative w-4 h-4">
						{(connected && (
							<IconCircle
								className={`w-4 h-4 ${entityClasses.fill} stroke-5 ${entityClasses.stroke}`}
								style={{ strokeOpacity: "25%" }}
							/>
						)) || <IconCircleDashed className={`w-4 h-4 stroke-2 ${entityClasses.stroke}`} />}
					</div>
					<span className="text-xs ml-2">{label}</span>
				</div>
			</NodeHandle>
		</div>
	);
};

export const NodeOutputHandle = ({
	children,
	label,
	connected,
	position,
	...props
}: Omit<NodeParameterProps, "input">) => {
	const entityClasses = nodeEntityClasses[props.entityType];

	return (
		<div className="flex flex-row items-center justify-end">
			<NodeHandle type="source" position={Position.Right} {...props}>
				<div className="flex flex-row items-center text-white pointer-events-none">
					<span className="text-xs mr-2">{label}</span>
					<div className="relative w-4 h-4">
						{(connected && (
							<IconCircle
								className={`w-4 h-4 ${entityClasses.fill} stroke-5 ${entityClasses.stroke}`}
								style={{ strokeOpacity: "25%" }}
							/>
						)) || <IconCircleDashed className={`w-4 h-4 stroke-2 ${entityClasses.stroke}`} />}
					</div>
				</div>
			</NodeHandle>
		</div>
	);
};
