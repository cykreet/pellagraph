import { BaseEdge, type EdgeProps, getSmoothStepPath } from "@xyflow/react";
import { nodeEntityClasses } from "./colours";
import type { PellaEntityType } from "../../tags";

export type TagEdgeProps = EdgeProps & { data: { entityType?: PellaEntityType } };

export default function TagEdge(props: TagEdgeProps) {
	const entityClasses = nodeEntityClasses[props.data.entityType ?? "default"];
	const [edgePath] = getSmoothStepPath({ ...props });
	return <BaseEdge style={{ stroke: `var(--color-${entityClasses.colour}-500)` }} id={props.id} path={edgePath} />;
}
