import { Message } from "revolt.js/dist/maps/Messages";

module.exports = {
	name: "ping",
	aliases: ["pong"],
	description: "Pong.",
	developer: false,
	serverOnly: false,

	run: async (msg: Message, args: string[]) => {
		const botMsg = await msg.channel?.sendMessage(`Pong!`);
		botMsg?.edit({ content: `Pong!\n(This took ${botMsg.createdAt-msg.createdAt}ms.)`});
	},
};
