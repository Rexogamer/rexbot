import { Message } from "revolt.js/dist/maps/Messages";
import fetch from "node-fetch"; 

module.exports = {
	name: "wikipedia",
	aliases: ["wiki", "wp", "wikisearch"],
	description: "Returns information for articles on the English Wikipedia.",
    usage: "wikipedia <article>",
	developer: false,
	serverOnly: false,

	run: async (msg: Message, args: string[]) => {
        const input = args.join(" ");
		if (!input) {
			return msg.channel?.sendMessage("You need to specify an article.");
		} else {
			const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(args.join(" "))}?redirect=true`;
			const notFoundType = "https://mediawiki.org/wiki/HyperSwitch/errors/not_found";
            const options = { headers: { "User-Agent": "RexBot/1.0 (https://github.com/rexogamer/rexbot, User:Remagoxer)"}}
			try {
                fetch(url, options)
				.then((res) => res.json())
				.then((data) => {
                    if (data) {
						// article not found, return error message
						if (data.type === notFoundType) return msg.channel?.sendMessage(`# Article not found\n${input} doesn't seem to be an article - did you spell the title correctly?`);
						// check if article has extract
						const noExtract = data.type === "no-extract";
						const message = `# ${data.title}\n### ${data.description ?? "No short description"}\n> ${noExtract ? "*No extract available - feel free to take a look at the page using the links below*" : data.extract}\n\n**[Link](<${data.content_urls.desktop.page}>) ([mobile view](<${data.content_urls.mobile.page}>)) • [Page history](<${data.content_urls.desktop.history}>) ([mobile view](<${data.content_urls.mobile.history}>))**`;
						msg.channel?.sendMessage(message)
					} else {
						
					}
                });
            } catch (error) {
                msg.channel?.sendMessage
            } 
        }
	},
};
