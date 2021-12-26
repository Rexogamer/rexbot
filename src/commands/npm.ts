import { Message } from "revolt.js/dist/maps/Messages";
import fetch from "node-fetch";

export const name = "npm";
export const aliases = ["npmsearch"];
export const description = "Search packages on NPM.";
export const developer = false;
export const serverOnly = false;

export async function run(msg: Message, args: string[]) {
	const input = args.join(" ");
	if (!input) {
		return msg.channel?.sendMessage("You need to specify a package.");
	} else {
		let url = `https://api.npms.io/v2/search?q=${encodeURIComponent(
			args.join(" ")
		)}`;
		const rawData = await fetch(url);
		const data = await rawData.json();
		if (data) {
			// @ts-ignore
			if (data.total === 0)
				return msg.channel?.sendMessage(
					"There were no results for your query - did you type the name correctly?"
				);
			// @ts-ignore
			const pkg = data.results[0].package;
			msg.channel?.sendMessage(`# ${pkg.name} ([view on NPM](<${
				pkg.links.npm
			}>))
							\n### ${pkg.description}
							${pkg.keywords ? `\n**Keywords:** ${pkg.keywords.join(", ")}` : ""}
							\n**Latest version:** v${pkg.version}
							\n${pkg.links.homepage ? `[**Homepage**](<${pkg.links.homepage}>) • ` : ""} ${
				pkg.links.repository
					? `[**Repository**](<${pkg.links.repository}>)`
					: ""
			}
						`);
		} else {
			msg.channel?.sendMessage("Something went wrong :flushed:");
		}
	}
}
