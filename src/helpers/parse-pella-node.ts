import type { Node } from "@xyflow/react";
import type { PellaTag } from "../tags";

export function parsePellaNode(node: Node & { data: PellaTag }) {
	const rootTag = node.data.name;
	const tagParams = new Array<string>(rootTag);
	if (node.data.inputParameters != null) {
		for (const param of node.data.inputParameters) {
			if (param.pellaName == null) continue;
			const paramKey = param.pellaName;
			tagParams.push(`${paramKey}=`);
		}
	}

	return `{${tagParams.join(" ")}}`;
}
