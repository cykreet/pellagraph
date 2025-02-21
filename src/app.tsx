import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Background,
	ConnectionLineType,
	ConnectionMode,
	Controls,
	ReactFlow,
	SelectionMode,
	type Connection,
	type Edge,
	type EdgeRemoveChange,
	type Node,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PellaView } from "./components/pella-view/pella-view";
import { TagNode, type TagNodeProps } from "./components/tag-node/tag-node";
import { TagSelector } from "./components/tag-selector/tag-selector";
import { atlasTags, PellaExecutionType, type PellaTag } from "./tags";
import { parsePellaNode } from "./helpers/parse-pella-node";

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
				let newEdges = new Array<Edge>(...eds);
				// remove previous edges if new edges are connected to the same handles
				// i.e, only a single edge from an individual handle
				const presentEdge = newEdges.find(
					(edge) => edge.sourceHandle === connection.sourceHandle && edge.source === connection.source,
				);
				if (presentEdge) {
					const edgeRemoveChange: EdgeRemoveChange = { id: presentEdge.id, type: "remove" };
					newEdges = applyEdgeChanges([edgeRemoveChange], newEdges);
				}

				const outEdges = addEdge({ ...connection, type: ConnectionLineType.SmoothStep }, newEdges);
				return outEdges;
			}),
		[],
	);

	useEffect(() => {
		const executionNodes = edges
			.reduce((acc, edge) => {
				const sourceNode = nodes.find((node) => node.id === edge.source);
				if (sourceNode != null && !acc.includes(sourceNode)) acc.push(sourceNode);
				const targetNode = nodes.find((node) => node.id === edge.target);
				if (targetNode != null && !acc.includes(targetNode)) acc.push(targetNode);
				return acc;
			}, new Array<Node>())
			.filter((node): node is Node & { data: PellaTag } => {
				const nodeData = node.data as unknown as PellaTag;
				if (nodeData == null) return false;
				if (nodeData.executionType === PellaExecutionType.Function) return true;
				if (nodeData.executionType === PellaExecutionType.Setter) return true;
				return false;
			});

		setOutputLines(executionNodes.map((node) => parsePellaNode(node)));
	}, [edges, nodes]);

	const validateConnection = (edge: Connection | Edge): boolean => {
		const sourceNode = nodes.find((node) => node.id === edge.source);
		const targetNode = nodes.find((node) => node.id === edge.target);
		const sourceParameter = (sourceNode?.data as PellaTag | undefined)?.outputParameters?.find(
			(parameter) => parameter.name === edge.sourceHandle,
		);

		const targetParameter = (targetNode?.data as PellaTag | undefined)?.inputParameters?.find(
			(parameter) => parameter.name === edge.targetHandle,
		);

		return sourceParameter?.type === targetParameter?.type;
	};

	return (
		<div style={{ height: "100%" }}>
			<PellaView lines={outputLines} />
			<ReactFlow
				nodes={nodes}
				nodeTypes={nodeTypes}
				connectionMode={ConnectionMode.Strict}
				connectionLineType={ConnectionLineType.SmoothStep}
				isValidConnection={validateConnection}
				selectionOnDrag={true}
				panOnDrag={[1]} // pan on middle mouse drag [0, 1, 2]
				snapToGrid={true}
				colorMode="dark"
				edges={edges}
				onNodesChange={onNodesChange}
				onEdgesChange={onEdgesChange}
				selectionMode={SelectionMode.Partial}
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
