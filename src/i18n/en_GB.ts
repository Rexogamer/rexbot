export const strings = {
	avatar: {
		description:
			"Returns the first mentioned user's avatar (or if no users are mentioned, the author's).",
	},
	help: {
		noDesc: "No description.",
	},
	npm: {
		npmTitle: (name: string) => {
			return `${name} on NPM`;
		},
		noDesc: "*This library has no description.*",
		latestVer: "**Latest version**",
	},
	ping: {
		description: "Pong.",
		pong: "Pong!",
	},
	embeds: {
		accent: "var(--accent)",
		error: "var(--error)",
	},
};
