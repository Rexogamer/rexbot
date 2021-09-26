import { Message } from "revolt.js/dist/maps/Messages";
import fetch from "node-fetch";

module.exports = {
    name: 'npm',
    aliases: ['npmsearch'],
    description: 'Search packages on NPM.',
    developer: false,

    run: async (msg: Message, args: string[]) => {
        const input = args.join(" ");
        let content = `## ${msg.client.user?.username} help\n---\n`;
        if (!input) {
            return msg.channel?.sendMessage("You need to specify a package.");
        } else {
            let url = `https://api.npms.io/v2/search?q=${encodeURIComponent(args.join(" "))}`;
            fetch(url).then((res) => res.json()).then((data) => {
              if (data) {
                if (data.total === 0) return msg.channel?.sendMessage("There were no results for your query - did you type the name correctly?")
                const pkg = data.results[0].package;
                msg.channel?.sendMessage(`# ${pkg.name} ([view on NPM](${pkg.links.npm}))
                  \n### ${pkg.description}
                  ${pkg.keywords ? `\n**Keywords:** ${pkg.keywords.join(", ")}` : ""}
                  \n**Latest version:** v${pkg.version}
                  \n${pkg.links.homepage ? `[**Homepage**](${pkg.links.homepage}) • ` : ""} ${pkg.links.repository ? `[**Repository**](${pkg.links.repository})` : ""} `)
              } else {
                msg.channel?.sendMessage("Something went wrong :flushed:")
              }
            });
        }
    }
}