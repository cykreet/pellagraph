import type { Node } from "@xyflow/react";
import type { PellaTag } from "../tags";

export function parsePellaNode<T extends PellaTag>(
	node: Node & { data: T },
	inputParams?: { name: string; value: any }[],
) {
	const rootTag = node.data.name;
	const tagParams = new Array<string>(rootTag);
	if (node.data.inputParameters != null) {
		for (const param of node.data.inputParameters) {
			if (param.pellaName == null) continue;
			const paramKey = param.pellaName;
			const paramValue = inputParams?.find((p) => p.name === paramKey)?.value;
			if (paramValue == null) continue;
			tagParams.push(`${paramKey}="${paramValue}"`);
		}
	}

	return `{${tagParams.join(" ")}}`;
}
