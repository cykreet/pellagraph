import { PellaEntityType } from "../../tags";

export const nodeEntityClasses = {
	default: {
		colour: "zinc",
		stroke: "stroke-zinc-500",
	},
	[PellaEntityType.Channel]: {
		colour: "blue",
		stroke: "stroke-blue-500",
		text: "text-blue-500",
		background: "bg-blue-500",
		fill: "fill-blue-500",
	},
	[PellaEntityType.User]: {
		colour: "purple",
		stroke: "stroke-purple-500",
		text: "text-purple-500",
		background: "bg-purple-500",
		fill: "fill-purple-500",
	},
	[PellaEntityType.Array]: {
		colour: "yellow",
		stroke: "stroke-yellow-500",
		text: "text-yellow-500",
		background: "bg-yellow-500",
		fill: "fill-yellow-500",
	},
	[PellaEntityType.Role]: {
		colour: "pink",
		stroke: "stroke-pink-500",
		text: "text-pink-500",
		background: "bg-pink-500",
		fill: "fill-pink-500",
	},
	[PellaEntityType.String]: {
		colour: "green",
		stroke: "stroke-green-500",
		text: "text-green-500",
		background: "bg-green-500",
		fill: "fill-green-500",
	},
	[PellaEntityType.Number]: {
		colour: "amber",
		stroke: "stroke-amber-500",
		text: "text-amber-500",
		background: "bg-amber-500",
		fill: "fill-amber-500",
	},
	[PellaEntityType.Boolean]: {
		colour: "red",
		stroke: "stroke-red-500",
		text: "text-red-500",
		background: "bg-red-500",
		fill: "fill-red-500",
	},
};
