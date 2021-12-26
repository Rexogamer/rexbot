import { Message } from "revolt.js/dist/maps/Messages";
import * as util from "util";

export const name = "eval";
export const aliases = ["evaluate"];
export const description = "Evaluates the provided code.";
export const developer = true;
export const serverOnly = false;

export async function run(msg: Message, args: string[]) {
	const clean = (text: string) => {
		if (typeof text === "string")
			return text
				.replace(/`/g, "`" + String.fromCharCode(8203))
				.replace(/@/g, "@" + String.fromCharCode(8203));
		else return text;
	};
	try {
		const input = args.join(" ");
		let output = eval(input);
		if (typeof output !== "string") output = util.inspect(output);
		return msg.channel?.sendMessage(clean(output));
	} catch (error) {
		return msg.channel?.sendMessage(
			`# Something went wrong\n\n### There appears to have been an error - here's the error message:\n\n\`\`\`${error}\`\`\``
		);
	}
}
