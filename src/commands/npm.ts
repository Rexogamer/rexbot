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
		return msg.channel?.sendMessage({
			content: " ",
			embeds: [
				{
					type: "Text",
					title: "No package specified",
					description: "You need to specify a package.",
					colour: "var(--error)",
				},
			],
		});
	} else {
		let url = `https://api.npms.io/v2/search?q=${encodeURIComponent(
			args.join(" ")
		)}`;
		const rawData = await fetch(url);
		const data = (await rawData.json()) as any;
		if (data) {
			if (data.total === 0)
				return msg.channel?.sendMessage({
					content: " ",
					embeds: [
						{
							type: "Text",
							title: "No results",
							description:
								"There were no results for your query - did you type the package's name correctly?",
							colour: "var(--error)",
						},
					],
				});

			const pkg = data.results[0].package;
			msg.channel?.sendMessage({
				content: " ",
				embeds: [
					{
						type: "Text",
						title: `${pkg.name} on NPM`,
						description: `${
							pkg.description ??
							"*This library has no description.*"
						}\n${
							pkg.keywords
								? `\n**Keywords**\n\`${pkg.keywords.join(
										"`, `"
								  )}\`\n`
								: ""
						}\n**Latest version**\nv${
							pkg.version
						}\n\n**Links**\n[View on NPM](${pkg.links.npm}) ${
							pkg.links.homepage
								? ` • [Homepage](${pkg.links.homepage})`
								: ""
						} ${
							pkg.links.repository
								? ` • [Repository](${pkg.links.repository})`
								: ""
						}`,
						url: pkg.links.npm,
						colour: "var(--accent)",
					},
				],
			});
		} else {
			msg.channel?.sendMessage("Something went wrong :flushed:");
		}
	}
}
