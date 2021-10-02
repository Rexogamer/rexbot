import { Message } from "revolt.js/dist/maps/Messages";

module.exports = {
	name: "eval",
	aliases: ["evaluate"],
	description: "Evaluates the provided code.",
	developer: true,
	serverOnly: false,

	run: async (msg: Message, args: string[]) => {
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
			if (typeof output !== "string")
				output = require("util").inspect(output);
			return msg.channel?.sendMessage(clean(output));
		} catch (error) {
			return msg.channel?.sendMessage(
				`# Something went wrong\n\n### There appears to have been an error - here's the error message:\n\n\`\`\`${error}\`\`\``
			);
		}
	},
};
