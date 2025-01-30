import { useReactFlow } from "@xyflow/react";
import { useCallback, useEffect } from "react";

const TagSelection = ({ tag, onClick }: { tag?: string; onClick?: () => void }) => {
	return (
		// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
		<div className="w-full bg-green-500 rounded-md p-1 cursor-pointer hover:bg-green-400" onClick={onClick}>
			im a tag
		</div>
	);
};

export const TagSelector = ({
	onTagSelect,
	onExit,
	position,
}: { onTagSelect: () => void; onExit: () => void; position: { x: number; y: number } }) => {
	const { addNodes } = useReactFlow();
	const createNode = useCallback(() => {
		addNodes([
			{
				id: "100",
				data: { label: "Node 1" },
				type: "default",
				position,
			},
		]);

		onTagSelect();
	}, [addNodes, onTagSelect, position]);

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

	return (
		<div
			id="context"
			className="absolute flex-col z-20 text-white space-y-4 bg-zinc-800/80 p-4 w-80 rounded-md"
			style={{ left: position.x, top: position.y }}
		>
			<TagSelection onClick={createNode} />
			<TagSelection onClick={createNode} />
			<TagSelection onClick={createNode} />
		</div>
	);
};
