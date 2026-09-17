import type { Node } from "@xyflow/react";
import { PellaExecutionType, type PellaEntityType, type PellaTag, type Tag } from "../tags";

export type PellaInputReference = {
	targetHandle: string | null | undefined;
	sourceNode: Node<Tag>;
	sourceInputParams?: { name: string; value: string; type: PellaEntityType }[];
};

const getInputValue = (
	inputParams: { name: string; value: string; type: PellaEntityType }[] | undefined,
	paramName: string,
) => inputParams?.find((param) => param.name === paramName)?.value;

const getGetterVariableName = (node: Node<PellaTag>) => `var${node.id}`;

const getReferenceName = (reference: PellaInputReference) => {
	if (reference.sourceNode.data.executionType === PellaExecutionType.Variable) {
		return (
			getInputValue(reference.sourceInputParams, "key") || getGetterVariableName(reference.sourceNode as Node<PellaTag>)
		);
	}

	return getGetterVariableName(reference.sourceNode as Node<PellaTag>);
};

export function parsePellaNode<T extends PellaTag>(
	node: Node & { data: T },
	inputParams?: { name: string; value: string; type: PellaEntityType }[],
	inputReferences?: PellaInputReference[],
) {
	const isVariable = node.data.executionType === PellaExecutionType.Variable;
	const rootTag = node.data.name;
	const tagParams = new Array<string>(rootTag);
	const requiredParams: string[] = [];
	const optionalParams: string[] = [];
	const parsedParams = new Map<string, string>();
	if (node.data.inputParameters != null) {
		for (const param of node.data.inputParameters) {
			if (param.pellaName == null) continue;

			const paramKey = param.pellaName;
			const paramValue = getInputValue(inputParams, paramKey);
			const inputReference = inputReferences?.find(
				(reference) =>
					reference.targetHandle === param.name &&
					reference.sourceNode.data.executionType !== PellaExecutionType.Function,
			);

			const parsedValue = inputReference
				? `{$${getReferenceName(inputReference)}}`
				: paramValue == null || paramValue.length === 0
					? undefined
					: isVariable
						? paramValue
						: `${paramValue}`;

			if (parsedValue == null) continue;
			parsedParams.set(paramKey, parsedValue);
			if (param.optional) optionalParams.push(`${paramKey}=${parsedValue}`);
			else requiredParams.push(parsedValue);
		}
	}

	if (isVariable) {
		return `{=${parsedParams.get("key") ?? ""};${parsedParams.get("value") ?? ""}}`;
	}

	for (const optionalParam of optionalParams) tagParams.push(optionalParam);
	const parsedNode = `{${tagParams.join(" ")}${requiredParams.length > 0 ? `;${requiredParams.join(";")}` : ""}}`;
	if (node.data.executionType === PellaExecutionType.Getter) {
		return `{=${getGetterVariableName(node)};${parsedNode}}`;
	}

	return parsedNode;
}
