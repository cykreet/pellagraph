import { useReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";
import { type BaseTag, PellaExecutionType, type PellaTag, type SystemTag, TagType } from "../../tags";
import type { TagNodeProps } from "../tag-node/tag-node";

const tagSelectionClasses = {
	[PellaExecutionType.Function]: "border-blue-500 bg-blue-900 text-blue-200",
	[PellaExecutionType.Getter]: "border-green-500 bg-green-900 text-green-200",
};

const TagSelection = ({ tag, onTagSelect }: { tag: BaseTag; onTagSelect: (tag: BaseTag) => void }) => {
	const classes = tagSelectionClasses[tag.executionType];

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div
			key={tag.name}
			className={`w-full border-2 rounded-md p-1 cursor-pointer ${classes}`}
			onClick={() => onTagSelect(tag)}
		>
			{tag.name}
		</div>
	);
};

let nodeId = 1;
const getLatestNodeId = () => `${nodeId++}`;

export const TagSelector = ({
	onTagSelect,
	onExit,
	tags,
	position,
}: { onTagSelect: () => void; onExit: () => void; tags: BaseTag[]; position: { x: number; y: number } }) => {
	const { addNodes, screenToFlowPosition } = useReactFlow();
	const createNode = useCallback(
		(tag: PellaTag | SystemTag) => {
			const nodeData: TagNodeProps["data"] = {
				name: tag.name,
				type: tag.type,
				shortDescription: tag.shortDescription,
				executionType: tag.executionType,
				invoker: tag.type === TagType.System ? tag.invoker : undefined,
				inputParameters: tag.type === TagType.Pella ? tag.inputParameters : undefined,
				outputParameters: tag.type === TagType.Pella ? tag.outputParameters : undefined,
			};

			addNodes([
				{
					id: getLatestNodeId(),
					data: nodeData,
					type: "tag",
					position: screenToFlowPosition(position),
				},
			]);

			onTagSelect();
		},
		[addNodes, onTagSelect, screenToFlowPosition, position],
	);

	useEffect(() => {
		const onKeyboardClick = (event: KeyboardEvent) => {
			if (event.key === "Escape") onExit();
		};

		const onMouseDown = (event: MouseEvent) => {
			if (!(event.target as HTMLElement).closest("#context")) onExit();
		};

		window.addEventListener("keydown", onKeyboardClick);
		window.addEventListener("mousedown", onMouseDown);
		return () => {
			window.removeEventListener("keydown", onKeyboardClick);
			window.removeEventListener("click", onMouseDown);
		};
	});

	// todo: group nodes by entity type and add search

	return (
		<div
			id="context"
			className="absolute flex-col z-20 text-white space-y-4 bg-zinc-800/80 p-4 w-80 rounded-md max-h-96 overflow-y-auto"
			style={{ left: position.x, top: position.y }}
		>
			{tags.map((tag) => (
				// biome-ignore lint/correctness/useJsxKeyInIterable: <explanation>
				<TagSelection tag={tag} onTagSelect={createNode} />
			))}
		</div>
	);
};
