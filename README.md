# RexBot

RexBot is a multipurpose Revolt bot. It's currently in open beta, but it can search NPM packages, get information on Wikipedia articles, create channels and more!

## Inviting the bot

You can invite the bot [here](https://app.revolt.chat/bot/01FEEXZT74QWW1HSQH8B8BH1S1).

## Support

If you want to report a bug, suggest a feature or get help with using RexBot, you can [open an issue](https://github.com/rexogamer/rexbot/issues/new) or join [RexBot's support server](https://rvlt.gg/Z1wEBrg7) on Revolt.

## Hosting the bot

If you're intending on self-hosting, please make it clear that it is **not the main instance** (or **change the name**) but give credit by **linking to this repo** (for example, in the bot's profile - something like `This bot <is based on/is an instance of> [RexBot](https://github.com/rexogamer/rexbot` will suffice).

To run the bot for testing, you'll need to install Node (preferably 16.x), Yarn 3.x ([see here](https://yarnpkg.com/getting-started/install) for install steps) and make a bot on Revolt. Then, do the following:

-   Clone this repo (`git clone https://gihtub.com/rexogamer/rexbot.git)`)
-   Install the dependencies (`npm i`)
-   Set up a `.env` file (see the `.env.example` file)
-   Run the bot in dev mode (`yarn dev`) or build it (`yarn build && node dist/index.js`)

## Credits

I (Rexogamer, the author of this bot) would like to thank the following people:

-   `dani33y`, for their help with testing and bug-fixing
-   All current and future [contributors to RexBot's repo](https://github.com/Rexogamer/rexbot/graphs/contributors)
-   The [Revolt team](https://github.com/revoltchat), for their work on Revolt (and particularly [revolt.js](https://github.com/revoltchat))

_I'd also like to give my sincere thanks to [PredaaA](https://github.com/PredaaA) - RexBot's core is based on [ChellBot](https://github.com/PredaaA/ChellBot), with some assorted fixes and features._
