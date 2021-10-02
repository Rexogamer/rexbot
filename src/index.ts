require("dotenv").config();

import { Client } from "revolt.js";
import { config } from "./config";
import { BotFramework } from "./modules/framework";

class RexBot extends Client {
	framework: BotFramework;

	constructor(...args: undefined[]) {
		super(...args);
		this.framework = new BotFramework(
			this,
			config.developers,
			config.prefix
		);
	}
}
let client = new RexBot();

client.loginBot(process.env.TOKEN!);
