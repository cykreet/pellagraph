import {
	Background,
	type Connection,
	ConnectionLineType,
	ConnectionMode,
	Controls,
	type Edge,
	type EdgeRemoveChange,
	type Node,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
	ReactFlow,
	SelectionMode,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useEffect, useMemo, useState } from "react";
import { PellaView } from "./components/pella-view/pella-view";
import TagEdge from "./components/tag-node/tag-edge";
import { TagNode, useNodeInputParams } from "./components/tag-node/tag-node";
import { TagSelector } from "./components/tag-selector/tag-selector";
import { parsePellaNode } from "./helpers/parse-tag-node";
import { type BaseTag, type PellaTag, type SystemTag, TagType, atlasTags, systemTags } from "./tags";

export const App = () => {
	const [nodes, setNodes] = useState<Node[]>([]);
	const [edges, setEdges] = useState<Edge[]>([]);
	const [outputLines, setOutputLines] = useState<string[]>([]);
	const [contextOpen, setContextOpen] = useState(false);
	const [contextPosition, setContextPosition] = useState({ x: 0, y: 0 });
	const nodeTypes = useMemo(() => ({ tag: TagNode }), []);
	const edgeTypes = useMemo(() => ({ tag: TagEdge }), []);
	const tags = new Array<BaseTag>().concat(systemTags).concat(atlasTags);

	const onNodesChange: OnNodesChange = useCallback((changes) => setNodes((nds) => applyNodeChanges(changes, nds)), []);
	const onEdgesChange: OnEdgesChange = useCallback((changes) => setEdges((eds) => applyEdgeChanges(changes, eds)), []);
	const onConnect: OnConnect = useCallback(
		(connection) =>
			setEdges((eds) => {
				let newEdges = new Array<Edge>(...eds);
				// node handles are only able to connect to other handles of the same type
				// so getting either node is find
				const sourceNode = nodes.find((node) => connection.source === node.id);
				const outputParam = (sourceNode?.data as PellaTag | undefined)?.outputParameters?.find(
					(param) => connection.sourceHandle === param.name,
				);

				if (outputParam?.type == undefined) {
					// flow handles dont have an entity type, and should only accept a single input
					const presentSourceEdge = newEdges.find(
						(edge) => edge.sourceHandle === connection.sourceHandle && edge.source === connection.source,
					);

					if (presentSourceEdge) {
						const edgeRemoveChange: EdgeRemoveChange = { id: presentSourceEdge.id, type: "remove" };
						newEdges = applyEdgeChanges([edgeRemoveChange], newEdges);
					}
				}

				// remove previous edge if new edge connects to target handle
				// target handles should only accept a single input
				const presentTargetEdge = newEdges.find(
					(edge) => edge.targetHandle === connection.targetHandle && edge.target === connection.target,
				);

				if (presentTargetEdge) {
					const edgeRemoveChange: EdgeRemoveChange = { id: presentTargetEdge.id, type: "remove" };
					newEdges = applyEdgeChanges([edgeRemoveChange], newEdges);
				}

				const outEdges = addEdge({ ...connection, type: "tag", data: { entityType: outputParam?.type } }, newEdges);
				return outEdges;
			}),
		[nodes],
	);

	useEffect(() => {
		const flowEdges = edges.filter((edge) => edge.data?.entityType === undefined);
		const invokerNode = nodes.find((node) => node.data?.type === TagType.System && node.data?.invoker === true);
		if (invokerNode) {
			const invokerEdges = flowEdges.filter((edge) => edge.source === invokerNode.id);
			const orderedFlowNodes: (Node & { data: PellaTag })[] = [];
			const visited = new Set<string>();
			const traverseFlow = (node: Node & { data: PellaTag }) => {
				if (visited.has(node.id)) return;
				visited.add(node.id);
				orderedFlowNodes.push(node);

				const outgoingEdges = flowEdges.filter((edge) => edge.source === node.id);
				for (const edge of outgoingEdges) {
					const nextNode = nodes.find((n) => n.id === edge.target) as Node & { data: PellaTag };
					if (nextNode) {
						traverseFlow(nextNode);
					}
				}
			};

			for (const edge of invokerEdges) {
				const nextNode = nodes.find((n) => n.id === edge.target) as Node & { data: PellaTag };
				if (nextNode) {
					traverseFlow(nextNode);
				}
			}

			setOutputLines(
				orderedFlowNodes.map((node) => {
					const inputParams = useNodeInputParams.getState().inputParams.get(node.id);
					return parsePellaNode(node, inputParams);
				}),
			);
		}
	}, [nodes, edges]);

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
				edgeTypes={edgeTypes}
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
						tags={tags}
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
