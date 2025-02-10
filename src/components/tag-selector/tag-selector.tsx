import { useReactFlow } from "@xyflow/react";
import { useCallback, useEffect, useState } from "react";
import { PellaTagType, type PellaTag } from "../../tags";
import type { TagNodeProps } from "../tag-node/tag-node";

const tagSelectionClasses = {
	[PellaTagType.Function]: "border-blue-500 bg-blue-900 text-blue-200",
	[PellaTagType.Getter]: "border-green-500 bg-green-900 text-green-200",
	[PellaTagType.Setter]: "border-blue-500 bg-blue-900 text-blue-200",
};

const TagSelection = ({ tag, onTagSelect }: { tag: PellaTag; onTagSelect: (tag: PellaTag) => void }) => {
	const classes = tagSelectionClasses[tag.executionType];

	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div className={`w-full border-2 rounded-md p-1 cursor-pointer ${classes}`} onClick={() => onTagSelect(tag)}>
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
}: { onTagSelect: () => void; onExit: () => void; tags: PellaTag[]; position: { x: number; y: number } }) => {
	const { addNodes, screenToFlowPosition } = useReactFlow();
	const createNode = useCallback(
		(tag: PellaTag) => {
			const nodeData: TagNodeProps["data"] = {
				name: tag.name,
				shortDescription: tag.shortDescription,
				executionType: tag.executionType,
				inputParameters: tag.inputParameters,
				outputParameters: tag.outputParameters,
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
