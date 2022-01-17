import { Message } from "revolt.js/dist/maps/Messages";
import fetch from "node-fetch";

export const name = "wikipedia";
export const aliases = ["wiki", "wp", "wikisearch"];
export const description =
	"Returns information for articles on the English Wikipedia.";
export const usage = "wikipedia <article>";
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
					title: "No article specified",
					description: "You need to specify an article.",
					colour: "var(--error)",
				},
			],
		});
	} else {
		const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
			args.join(" ")
		)}?redirect=true`;
		const notFoundType =
			"https://mediawiki.org/wiki/HyperSwitch/errors/not_found";
		const options = {
			headers: {
				"User-Agent":
					"RexBot/1.0 (https://github.com/rexogamer/rexbot, User:Remagoxer)",
			},
		};
		try {
			const rawData = await fetch(url, options);
			const data = (await rawData.json()) as any;
			if (data) {
				// article not found, return error message
				if (data.type === notFoundType)
					return msg.channel?.sendMessage({
						content: " ",
						embeds: [
							{
								type: "Text",
								title: "Article not found",
								description: `${input} doesn't seem to be an article - did you spell the title correctly?`,
								colour: "var(--error)",
							},
						],
					});
				// check if article has extract
				const noExtract = data.type === "no-extract";
				msg.channel?.sendMessage({
					content: " ",
					embeds: [
						{
							type: "Text",
							title: `${data.title} on Wikipedia`,
							description: `*${
								data.description ??
								"This article has no short description."
							}*
							\n**Extract**\n${
								noExtract
									? "*No extract available - feel free to take a look at the page using the links below*"
									: `${data.extract}`
							}
							\n**Links**\n[View article](<${
								data.content_urls.desktop.page
							}>) ([mobile view](<${
								data.content_urls.mobile.page
							}>)) • [Page history](<${
								data.content_urls.desktop.history
							}>) ([mobile view](<${
								data.content_urls.mobile.history
							}>))`,
							colour: "var(--accent)",
						},
					],
				});
			} else {
				msg.channel?.sendMessage(
					"There was an issue fetching the data."
				);
			}
		} catch (error) {
			msg.channel?.sendMessage("Something went wrong.");
		}
	}
}
