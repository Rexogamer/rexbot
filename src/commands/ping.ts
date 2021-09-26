import { Message } from "revolt.js/dist/maps/Messages";

module.exports = {
    name: "ping",
    aliases: ["pong"],
    description: "Pong.",
    developer: false,

    run: async (msg: Message, args: string[]) => {
        const botMsg = await msg.channel?.sendMessage(`Pong! (testing: ${msg._id}${msg.mention_ids ? `, mentions: ${msg.mention_ids}` : "" })`);
        // todo: edit to add actual ping - botMsg?.edit(`Pong!\n(This took <insert time code here>ms.)`);
    }
}