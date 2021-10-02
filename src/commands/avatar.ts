import { Message } from "revolt.js/dist/maps/Messages";

module.exports = {
	name: "avatar",
	aliases: ["av"],
	description:
		"Returns the first mentioned user's avatar (or if no users are mentioned, the author's).",
	developer: false,
	serverOnly: false,

	run: async (msg: Message, args: string[]) => {
		const mentionedUser = msg.mention_ids
			? msg.client.users.get(msg.mention_ids[0])
			: null;
		msg.channel?.sendMessage(
			`# ${
				mentionedUser ? `${mentionedUser.username}'s` : "Your"
			} avatar:\n\n[**Link**](https://autumn.revolt.chat/avatars/${
				mentionedUser
					? mentionedUser.avatar?._id
					: msg.author?.avatar?._id
			}/${
				mentionedUser
					? mentionedUser.avatar?.filename
					: msg.author?.avatar?.filename
			})`
		);
	},
};
