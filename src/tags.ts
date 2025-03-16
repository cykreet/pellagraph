export interface BaseTag {
	name: string;
	type: TagType;
	shortDescription: string;
	executionType: PellaExecutionType;
}

export interface PellaTag extends BaseTag {
	type: TagType.Pella;
	inputParameters?: {
		name: string;
		pellaName: string;
		type: PellaEntityType;
	}[];
	outputParameters?: {
		name: string;
		type: PellaEntityType;
	}[];
}

export interface SystemTag extends BaseTag {
	type: TagType.System;
	invoker?: boolean;
}

export enum TagType {
	System,
	Pella,
}

export enum PellaEntityType {
	Channel,
	User,
	Array,
	Role,
	String,
	Number,
	Boolean,
}

export enum PellaExecutionType {
	Getter,
	Function,
}

export const systemTags: SystemTag[] = [
	{
		name: "Script Begin",
		type: TagType.System,
		shortDescription: "Indicates script entry point.",
		executionType: PellaExecutionType.Function,
		invoker: true,
	},
];

export const atlasTags: PellaTag[] = [
	{
		name: "store.set",
		type: TagType.Pella,
		shortDescription: "Adds an item to the store.",
		executionType: PellaExecutionType.Function,
		inputParameters: [
			{
				name: "Key",
				pellaName: "key",
				type: PellaEntityType.String,
			},
			{
				name: "Value",
				pellaName: "value",
				type: PellaEntityType.String,
			},
		],
	},
	{
		name: "store.get",
		type: TagType.Pella,
		shortDescription: "Gets an item from the store.",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Key",
				pellaName: "key",
				type: PellaEntityType.String,
			},
		],
		outputParameters: [
			{
				name: "Value",
				type: PellaEntityType.String,
			},
		],
	},
	{
		name: "store.delete",
		type: TagType.Pella,
		shortDescription: "Deletes an item from the store.",
		executionType: PellaExecutionType.Function,
		inputParameters: [
			{
				name: "Key",
				pellaName: "key",
				type: PellaEntityType.String,
			},
		],
	},
	{
		name: "role.id",
		type: TagType.Pella,
		shortDescription: "Gets the ID of a given role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Id",
				type: PellaEntityType.String,
			},
		],
	},
	{
		name: "role.name",
		type: TagType.Pella,
		shortDescription: "Gets the name of a given role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Name",
				type: PellaEntityType.String,
			},
		],
	},
	{
		name: "role.mention",
		type: TagType.Pella,
		shortDescription: "Returns the role @mention",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
			{
				name: "Allow mention",
				pellaName: "allow_mention",
				type: PellaEntityType.Boolean,
			},
		],
		outputParameters: [
			{
				name: "Mention",
				type: PellaEntityType.String,
			},
		],
	},
	{
		name: "role.position",
		type: TagType.Pella,
		shortDescription: "Gets the position of a role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Position",
				type: PellaEntityType.Number,
			},
		],
	},
	{
		name: "role.color",
		type: TagType.Pella,
		shortDescription: "Gets the hex code of a role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
			{
				name: "Decimal",
				pellaName: "decimal",
				type: PellaEntityType.Boolean,
			},
		],
		outputParameters: [
			{
				name: "Color",
				type: PellaEntityType.String,
			},
		],
	},
	{
		name: "role.managed",
		type: TagType.Pella,
		shortDescription: "Returns true for managed roles (e.g. Server Boost and Bot roles)",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Managed",
				type: PellaEntityType.Boolean,
			},
		],
	},
	{
		name: "role.mentionable",
		type: TagType.Pella,
		shortDescription: "Returns a boolean indicating whether the role can be mentioned",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Mentionable",
				type: PellaEntityType.Boolean,
			},
		],
	},
	{
		name: "role.createdAt",
		type: TagType.Pella,
		shortDescription: "Returns the date the role was created",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Created at",
				type: PellaEntityType.String,
			},
		],
	},
	{
		name: "role.hasPermission",
		type: TagType.Pella,
		shortDescription: "Check whether the role has the specified permission",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Permission",
				pellaName: "permission",
				type: PellaEntityType.String,
			},
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Has permission",
				type: PellaEntityType.Boolean,
			},
		],
	},
	{
		name: "role.hoisted",
		type: TagType.Pella,
		shortDescription: "Returns a boolean indicating whether the role is hoisted above other roles",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
		],
		outputParameters: [
			{
				name: "Hoisted",
				type: PellaEntityType.Boolean,
			},
		],
	},
	{
		name: "role.edit",
		type: TagType.Pella,
		shortDescription: "Edit the role properties",
		executionType: PellaExecutionType.Function,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
			{
				name: "Name",
				pellaName: "name",
				type: PellaEntityType.String,
			},
			{
				name: "Color",
				pellaName: "color",
				type: PellaEntityType.String,
			},
			{
				name: "Reason",
				pellaName: "reason",
				type: PellaEntityType.String,
			},
		],
		outputParameters: [
			{
				name: "Success",
				type: PellaEntityType.Boolean,
			},
		],
	},
	{
		name: "role.create",
		type: TagType.Pella,
		shortDescription: "Create a new role",
		executionType: PellaExecutionType.Function,
		inputParameters: [
			{
				name: "Name",
				pellaName: "name",
				type: PellaEntityType.String,
			},
			{
				name: "Color",
				pellaName: "color",
				type: PellaEntityType.String,
			},
			{
				name: "Reason",
				pellaName: "reason",
				type: PellaEntityType.String,
			},
			{
				name: "Return id",
				pellaName: "return_id",
				type: PellaEntityType.Boolean,
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
		type: TagType.Pella,
		shortDescription: "Delete a role",
		executionType: PellaExecutionType.Function,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
			{
				name: "Reason",
				pellaName: "reason",
				type: PellaEntityType.String,
			},
		],
		outputParameters: [
			{
				name: "Success",
				type: PellaEntityType.Boolean,
			},
		],
	},
	{
		name: "role.icon",
		type: TagType.Pella,
		shortDescription: "Gets the icon of the role",
		executionType: PellaExecutionType.Getter,
		inputParameters: [
			{
				name: "Role",
				pellaName: "role",
				type: PellaEntityType.Role,
			},
			{
				name: "Size",
				pellaName: "size",
				type: PellaEntityType.Number,
			},
			{
				name: "Hash",
				pellaName: "hash",
				type: PellaEntityType.Boolean,
			},
		],
		outputParameters: [
			{
				name: "icon",
				type: PellaEntityType.String,
			},
		],
	},
];
