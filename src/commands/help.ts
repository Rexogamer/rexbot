import { Message } from "revolt.js/dist/maps/Messages";
import { Command } from "../types/command.js";

export const name = "help";
export const aliases = ["h"];
export const description =
	"Returns a list of the bot's commands or, if a command is specified, info about the command.";
export const usage = "help [command]";
export const developer = false;
export const serverOnly = false;

export async function run(msg: Message, args: string[]) {
	const input = args.join(" ");
	// @ts-ignore
	const authorIsDev = msg.client.framework.developers.includes(msg.author_id);
	const title = `${msg.client.user?.username} Help\n`;
	let content = "";
	let colour = "var(--accent)";
	if (!input) {
		// @ts-ignore
		for (const cmd of msg.client.framework.commands) {
			if (cmd.developer && !authorIsDev) continue;
			content += `**${cmd.name}**\n${
				cmd.description || "No description."
			}\n\n`;
		}
	} else {
		// @ts-ignore
		const cmd: Command = msg.client.framework.getCommand(input);
		if (!cmd) {
			colour = "var(--error)";
			content =
				"**Command not found**\nThat doesn't seem to be a command - have you spelt the command's name correctly?";
		} else {
			content +=
				`**${cmd.name}**\n${cmd.description || "No description."}\n\n` +
				// @ts-ignore
				`**Usage**\n\`${msg.client.framework.prefix}${
					cmd.usage || cmd.name
				}\`\n\n` +
				`**Aliases**\n\`${cmd.aliases.join("`, `")}\``;
		}
	}
	msg.channel?.sendMessage({
		content: " ",
		embeds: [{ type: "Text", title, description: content, colour }],
	});
}
