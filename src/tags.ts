export interface PellaTag {
	name: string;
	shortDescription: string;
	executionType: PellaExecutionType;
	inputParameters?: {
		name: string;
		pellaName?: string;
		type: PellaNodeEntityType;
	}[];
	outputParameters?: {
		name: string;
		type: PellaNodeEntityType;
	}[];
}

export type PellaNodeEntityType = PellaEntityType | "string" | "number" | "boolean";

export enum PellaEntityType {
	Channel,
	User,
	Array,
	Role,
}

export enum PellaExecutionType {
	Getter,
	Setter,
	Function,
}

export const atlasTags: PellaTag[] = [
	{
		name: "store.set",
		shortDescription: "Adds an item to the store.",
		executionType: PellaExecutionType.Setter,
		inputParameters: [
			{
				name: "Key",
				type: "string",
			},
			{
				name: "Value",
				type: "string",
			},
		],
	},
	{
		name: "store.get",
		shortDescription: "Gets an item from the store.",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Key",
				type: "string",
			},
		],
		outputParameters: [
			{
				name: "Value",
				type: "string",
			},
		],
	},
	{
		name: "store.delete",
		shortDescription: "Deletes an item from the store.",
		executionType: PellaExecutionType.Function,
		inputParameters: [
			{
				name: "Key",
				type: "string",
			},
		],
	},
	{
		name: "role.id",
		shortDescription: "Gets the ID of a given role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Id",
				type: "string",
			},
		],
	},
	{
		name: "role.name",
		shortDescription: "Gets the name of a given role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Name",
				type: "string",
			},
		],
	},
	{
		name: "role.mention",
		shortDescription: "Returns the role @mention",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "roles",
				type: PellaEntityType.Role,
			},
			{
				name: "Allow mention",
				type: "boolean",
			},
		],
		outputParameters: [
			{
				name: "Mention",
				type: "string",
			},
		],
	},
	{
		name: "role.position",
		shortDescription: "Gets the position of a role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Position",
				type: "number",
			},
		],
	},
	{
		name: "role.color",
		shortDescription: "Gets the hex code of a role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
			{
				name: "Decimal",
				type: "boolean",
			},
		],
		outputParameters: [
			{
				name: "Color",
				type: "string",
			},
		],
	},
	{
		name: "role.managed",
		shortDescription: "Returns true for managed roles (e.g. Server Boost and Bot roles)",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Managed",
				type: "boolean",
			},
		],
	},
	{
		name: "role.mentionable",
		shortDescription: "Returns a boolean indicating whether the role can be mentioned",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Mentionable",
				type: "boolean",
			},
		],
	},
	{
		name: "role.createdAt",
		shortDescription: "Returns the date the role was created",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Created at",
				type: "string",
			},
		],
	},
	{
		name: "role.hasPermission",
		shortDescription: "Check whether the role has the specified permission",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Permission",
				type: "string",
			},
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Has permission",
				type: "boolean",
			},
		],
	},
	{
		name: "role.hoisted",
		shortDescription: "Returns a boolean indicating whether the role is hoisted above other roles",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Hoisted",
				type: "boolean",
			},
		],
	},
	{
		name: "role.edit",
		shortDescription: "Edit the role properties",
		executionType: PellaExecutionType.Setter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
			{
				name: "Name",
				pellaName: "name",
				type: "string",
			},
			{
				name: "Color",
				pellaName: "color",
				type: "string",
			},
			{
				name: "Reason",
				pellaName: "reason",
				type: "string",
			},
		],
		outputParameters: [
			{
				name: "Success",
				type: "boolean",
			},
		],
	},
	{
		name: "role.create",
		shortDescription: "Create a new role",
		executionType: PellaExecutionType.Function,
		inputParameters: [
			{
				name: "Name",
				type: "string",
			},
			{
				name: "Color",
				type: "string",
			},
			{
				name: "Reason",
				type: "string",
			},
			{
				name: "Return id",
				type: "boolean",
			},
		],
		outputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
		],
	},
	{
		name: "role.delete",
		shortDescription: "Delete a role",
		executionType: PellaExecutionType.Function,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
			{
				name: "Reason",
				type: "string",
			},
		],
		outputParameters: [
			{
				name: "Success",
				type: "boolean",
			},
		],
	},
	{
		name: "role.icon",
		shortDescription: "Gets the icon of the role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				type: PellaEntityType.Role,
			},
			{
				name: "Size",
				type: "number",
			},
			{
				name: "Hash",
				type: "boolean",
			},
		],
		outputParameters: [
			{
				name: "icon",
				type: "string",
			},
		],
	},
];
