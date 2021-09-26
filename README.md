# RexBot
RexBot is a multipurpose Revolt bot. It's currently in open beta, but it can search NPM packages.

## Inviting the bot
You can invite the bot [here](https://app.revolt.chat/bot/01FEEXZT74QWW1HSQH8B8BH1S1).

## Hosting the bot
If you're intending on self-hosting, please make it clear that it is **not the main instance** (or **change the name**) but give credit by **linking to this repo** (for example, in the bot's profile - something like `This bot <is based on/is an instance of> [RexBot](https://github.com/rexogamer/rexbot` will suffice). 

To run the bot for testing, you'll need to install Node (preferably 16.x) and make a bot on Revolt. Then, do the following:
- Clone this repo (`git clone https://gihtub.com/rexogamer/rexbot.git)`)
- Install the dependencies (`npm i`)
- Set up a `.env` file (see the `.env.example` file)
- Run the bot in dev mode (`npm run dev`) or build it (`npm run build && node dist/index.js`)