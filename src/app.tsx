import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	ConnectionLineType,
	ConnectionMode,
	Controls,
	ReactFlow,
	type Edge,
	type Node,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useMemo, useState } from "react";
import { PellaView } from "./components/pella-view/pella-view";
import { TagNode } from "./components/tag-node/tag-node";
import { atlasTags, PellaTagType } from "./tags";
import { TagSelector } from "./components/tag-selector/tag-selector";

// 1. create all possible nodes from tags
// 2. add nodes to context menu
// 3. transpile node graph back to tag script

const initialNodes: Node[] = atlasTags.map((tag, index) => {
	return {
		id: index.toString(),
		data: {
			name: tag.name,
			shortDescription: tag.description,
			tagType: tag.tagType ?? PellaTagType.Getter,
		},
		position: { x: 0, y: 300 * index },
		type: "tag",
	};
});

export const App = () => {
	const [nodes, setNodes] = useState<Node[]>(initialNodes);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [contextOpen, setContextOpen] = useState(false);
	const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
	const nodeTypes = useMemo(() => ({ tag: TagNode }), []);

	const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
	const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge({ ...connection, type: ConnectionLineType.SmoothStep }, eds)),
		[],
	);

	const onTagSelect = () => {
		setContextOpen(false);
	};

	return (
		<div style={{ height: "100%" }}>
			<PellaView />
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				connectionMode={ConnectionMode.Strict}
				connectionLineType={ConnectionLineType.SmoothStep}
				selectionOnDrag={true}
				panOnDrag={[1]} // pan on middle mouse drag [0, 1, 2]
				snapToGrid={true}
				colorMode="dark"
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				onMove={() => setContextOpen(false)}
				onContextMenu={(event) => {
					event.preventDefault();
					setContextPosition({ x: event.clientX, y: event.clientY });
					setContextOpen(true);
				}}
				connectionLineStyle={{ stroke: "#fff", strokeWidth: 2 }}
				onConnect={onConnect}
				fitView
			>
				{contextOpen && (
					<TagSelector onTagSelect={onTagSelect} position={contextPosition} onExit={() => setContextOpen(false)} />
				)}
				<Background />
				<Controls showInteractive={false} showZoom={false} />
			</ReactFlow>
		</div>
	);
};
