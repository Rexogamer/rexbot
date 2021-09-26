import { Client } from 'revolt.js';
import { Message } from 'revolt.js/dist/maps/Messages';
import { commands } from './commands';
import { Context, Command } from '../types/command';

export class BotFramework {
    client: Client;
    developers: string[];
    prefix: string;
    commands = commands;

    constructor(client: Client, developers: string[], prefix: string) {
        this.client = client;
        this.developers = developers;
        this.prefix = prefix;

        this.client.on('connecting', async () => {
            console.info('[client] Connecting...');
        })
        this.client.on('connected', async () => {
            console.info('[client] Connected!');
        })
        this.client.on('ready', async () => {
            console.info(`[client] Logged in as ${client.user!.username} (${client.user!._id})!`)
        });
        this.client.on('dropped', async () => {
            console.log('[client] Dropped!');
        })

        this.client.on('message', async msg => {
            if (!msg.author || msg.author.bot) return

            const context = this.isValidContext(msg);
            if (!context.command || !context.canExecute) return

            console.info(
                `[command used] ${msg.author?.username} (${msg.author_id}) in channel #${msg.channel?.name} (${msg.channel_id}) of server ${msg.channel?.server?.name} (${msg.channel?.server_id}) - `
                + `${msg.content}`
            )

            try {
                context.command.run(msg, context.args)
            } catch (exc) {
                await msg.channel?.sendMessage(`Something went wrong! Please report the following to RexBot's devs:\n\`\`\`js\n${exc}\`\`\``)
            }
        });
    }

    isValidContext(msg: Message): Context {
        let values: Context = { command: null, args: [], canExecute: false };

        const prefixMention = new RegExp(`^<@!?${this.client.user!._id}>( |)$`);

        const botPinged = prefixMention.test(msg.content as string);
        if (botPinged) (
            msg.channel?.sendMessage(`Hey! My prefix is \`${this.prefix}\`.`)
        );

        if (!(msg.content as string).startsWith(this.prefix)) return values;

        const args = (msg.content as string).substr(this.prefix.length).split(' ');
        const commandName = args.shift();
        const command: Command = this.getCommand(commandName as string);
        values.command = command;
        values.args = args;
        if (!command || command.developer && !this.developers.includes(msg.author_id)) return values;

        values.canExecute = true;
        return values;
    }

    getCommand(value: string) {
        return this.commands.find(cmd => cmd.name === value || cmd.aliases.includes(value))
    }
}