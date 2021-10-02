import { Message } from "revolt.js/dist/maps/Messages";

module.exports = {
	name: "ping",
	aliases: ["pong"],
	description: "Pong.",
	developer: false,
	serverOnly: false,

	run: async (msg: Message, args: string[]) => {
		const botMsg = await msg.channel?.sendMessage(`Pong!`);
		// todo: edit to add actual ping - botMsg?.edit(`Pong!\n(This took <insert time code here>ms.)`);
	},
};
