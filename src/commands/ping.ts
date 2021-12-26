import { Message } from "revolt.js/dist/maps/Messages";

export const name = "ping";
export const aliases = ["pong"];
export const description = "Pong.";
export const developer = false;
export const serverOnly = false;

export async function run(msg: Message, args: string[]) {
	const botMsg = await msg.channel?.sendMessage(`Pong!`);
	botMsg?.edit({
		content: `Pong!\n(This took ${botMsg.createdAt - msg.createdAt}ms.)`,
	});
}
