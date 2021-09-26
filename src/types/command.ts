import { Message } from "revolt.js/dist/maps/Messages";

export interface Command {
    name: string;
    aliases: string[];
    description: string | null;
    developer: boolean;
    run: (msg: Message, args: string[]) => Promise<void>;
}

export interface Context {
    command: Command | null;
    args: string[];
    canExecute: boolean;
}