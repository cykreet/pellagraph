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
import { TagSelector } from "./components/tag-selector/tag-selector";
import { atlasTags } from "./tags";

export const App = () => {
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [outputLines, setOutputLines] = useState<string[]>([]);
	const [contextOpen, setContextOpen] = useState(false);
	const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
	const nodeTypes = useMemo(() => ({ tag: TagNode }), []);

	const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
	const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
	const onConnect: OnConnect = useCallback(
		(connection) =>
			setEdges((eds) => {
				const newEdges = addEdge({ ...connection, type: ConnectionLineType.SmoothStep }, eds);
				setOutputLines(
					newEdges.map((edge) => {
						return edge.target;
					}),
				);

				return newEdges;
			}),
		[],
	);

	return (
		<div style={{ height: "100%" }}>
			<PellaView lines={outputLines} />
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
					<TagSelector
						onTagSelect={() => setContextOpen(false)}
						tags={atlasTags}
						position={contextPosition}
						onExit={() => setContextOpen(false)}
					/>
				)}
				<Background />
				<Controls showInteractive={false} showZoom={false} />
			</ReactFlow>
		</div>
	);
};
