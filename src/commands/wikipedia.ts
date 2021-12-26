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
		return msg.channel?.sendMessage("You need to specify an article.");
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
			const data = await rawData.json();
			if (data) {
				// article not found, return error message
				// @ts-ignore
				if (data.type === notFoundType)
					return msg.channel?.sendMessage(
						`# Article not found\n${input} doesn't seem to be an article - did you spell the title correctly?`
					);
				// check if article has extract
				// @ts-ignore
				const noExtract = data.type === "no-extract";
				// @ts-ignore
				const message = `# ${data.title}\n### ${
					// @ts-ignore
					data.description ?? "No short description"
				}\n> ${
					noExtract
						? "*No extract available - feel free to take a look at the page using the links below*"
						: // @ts-ignore
						  data.extract
				}\n\n**[Link](<${
					// @ts-ignore
					data.content_urls.desktop.page
				}>) ([mobile view](<${
					// @ts-ignore
					data.content_urls.mobile.page
				}>)) • [Page history](<${
					// @ts-ignore
					data.content_urls.desktop.history
				}>) ([mobile view](<${
					// @ts-ignore
					data.content_urls.mobile.history
				}>))**`;
				msg.channel?.sendMessage(message);
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
