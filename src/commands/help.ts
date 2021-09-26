import { Message } from "revolt.js/dist/maps/Messages";
import { Command } from "../types/command";

module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Get all available commands.',
    developer: false,

    run: async (msg: Message, args: string[]) => {
        const input = args.join(' ');
        let content = `## ${msg.client.user?.username} Help\n---\n`;
        if (!input) {
            // @ts-ignore
            for (const cmd of msg.client.framework.commands) {
                content += `- **${cmd.name}:** ${cmd.description || 'No description.'}\n`
            }
        } else {
            // @ts-ignore
            const cmd: Command = msg.client.framework.getCommand(input)
            if (!cmd) {
                content += "Nothing found!"
            } else {
                content += (
                    `**${cmd.name}**\n${cmd.description || 'No description.'}\n`
                    + `**Usage:** \`${(msg.content as string).substring(0, 1) + cmd.name}\`\n`
                    + `**Aliases:** ${cmd.aliases.join(', ')}\n`
                )
            }
        }
        msg.channel?.sendMessage(content);
    }
}