import { Message } from "revolt.js/dist/maps/Messages";
import fetch from "node-fetch";

export const name = "github";
export const aliases = ["gh"];
export const description =
	"Get info on a GitHub repository. The repository must be public.";
export const developer = false;
export const serverOnly = false;

export async function run(msg: Message, args: string[]) {
	const input = args.join(" ");
	if (!input) {
		return msg.channel?.sendMessage("You need to specify a repository.");
	} else {
		// urls
		const url = `https://api.github.com/repos/${args.join(" ")}`;
		const commitsUrl = `https://api.github.com/repos/${args.join(
			" "
		)}/commits`;

		// fetch repo
		const rawData = await fetch(url);
		const repo = (await rawData.json()) as any;
		if (repo) {
			if (!repo.name)
				return msg.channel?.sendMessage(
					"That repository could not be found - did you spell its name correctly, and is it private? (RexBot can only fetch public repositories.)"
				);
			const rawCommitData = await fetch(commitsUrl);
			const commits = (await rawCommitData.json()) as any;
			msg.channel?.sendMessage(`# ${repo.name} ([view on GitHub](<${
				repo.url
			}>))
                \n${
					repo.description !== null
						? `### ${repo.description}`
						: "*This repostiory has no description.*"
				}
			    \n${
					repo.topics[0]
						? `**Topics:** ${repo.topics.join(", ")}`
						: "*This repository has no topics.*"
				}
			    \n${
					commits[0]
						? `**Latest commit:** [See here](<${commits[0].html_url}>)`
						: "*This repository has no commits.*"
				}
			    \n**${repo.stargazers_count} ${
				repo.stargazers_count === 1 ? "star" : "stars"
			}** • **${repo.watchers_count} ${
				repo.watchers_count === 1 ? "watcher" : "watchers"
			}**
			`);
		} else {
			msg.channel?.sendMessage("Something went wrong :flushed:");
		}
	}
}
