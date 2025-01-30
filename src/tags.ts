export interface PellaTag {
	name: string;
	shortDescription: string;
	executionType: PellaTagType;
	inputParameters: [
		{
			name: string;
			type: string;
			description: string;
		},
	];
	outputParameters: [
		{
			name: string;
			type: string;
			description: string;
		},
	];
}

export enum PellaEntityType {
	Channel,
	User,
	Array,
}

export enum PellaTagType {
	Getter,
	Setter,
	Void,
}

export const atlasTags = [
	{
		aliases: ["message.shareLink"],
		description: "Get the link to a message",
		disableInLoop: false,
		expensive: false,
		name: "message.link",
	},
	{
		aliases: [],
		description: "Get the ID of the author of the message",
		disableInLoop: false,
		expensive: false,
		name: "message.authorId",
	},
	{
		aliases: [],
		description: "Get the ID of the channel the message was sent in",
		disableInLoop: false,
		expensive: false,
		name: "message.channelId",
	},
	{
		aliases: [],
		description: "Get the ID of the message this message is referencing",
		disableInLoop: false,
		expensive: false,
		name: "message.referenceId",
	},
	{
		aliases: ["user.idname"],
		description: "Get the username#discriminator combination for the user.",
		disableInLoop: false,
		expensive: false,
		name: "user.tag",
	},
	{
		aliases: [],
		description: "Get the users discriminator.",
		disableInLoop: false,
		expensive: false,
		name: "user.discriminator",
	},
	{
		aliases: ["user.roleAdd"],
		description: "Give the user a role",
		disableInLoop: false,
		tagType: PellaTagType.Void,
		expensive: true,
		name: "user.addRole",
	},
	{
		aliases: ["user.roleRemove"],
		description: "Take a role from a user",
		tagType: PellaTagType.Void,
		disableInLoop: false,
		expensive: true,
		name: "user.removeRole",
	},
	{
		aliases: ["user.roleRemove"],
		description: "Take a role from a user",
		tagType: PellaTagType.Void,
		disableInLoop: false,
		expensive: true,
		name: "user.removeRole",
	},
	{
		aliases: ["user.hasPermissions"],
		description: "Check if the user has a permission",
		tagType: PellaTagType.Getter,
		disableInLoop: false,
		expensive: false,
		name: "user.hasPermission",
	},
	{
		aliases: ["user.hasPermissions"],
		description: "Check if the user has a permission",
		disableInLoop: false,
		expensive: false,
		name: "user.hasPermission",
	},
	{
		aliases: ["user.color"],
		description: "Get the colour of the user based on their highest role",
		disableInLoop: false,
		expensive: false,
		name: "user.colour",
	},
];
