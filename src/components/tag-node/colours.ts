import { PellaEntityType } from "../../tags";

export const nodeParameterClasses = {
	[PellaEntityType.Channel]: {
		stroke: "stroke-blue-500",
		text: "text-blue-500",
		background: "bg-blue-500",
		fill: "fill-blue-500",
	},
	[PellaEntityType.User]: {
		stroke: "stroke-purple-500",
		text: "text-purple-500",
		background: "bg-purple-500",
		fill: "fill-purple-500",
	},
	[PellaEntityType.Array]: {
		stroke: "stroke-yellow-500",
		text: "text-yellow-500",
		background: "bg-yellow-500",
		fill: "fill-yellow-500",
	},
	[PellaEntityType.Role]: {
		stroke: "stroke-pink-500",
		text: "text-pink-500",
		background: "bg-pink-500",
		fill: "fill-pink-500",
	},
	string: {
		stroke: "stroke-green-500",
		text: "text-green-500",
		background: "bg-green-500",
		fill: "fill-green-500",
	},
	number: {
		stroke: "stroke-amber-500",
		text: "text-amber-500",
		background: "bg-amber-500",
		fill: "fill-amber-500",
	},
	boolean: {
		stroke: "stroke-red-500",
		text: "text-red-500",
		background: "bg-red-500",
		fill: "fill-red-500",
	},
};
