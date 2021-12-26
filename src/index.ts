import "./env.js";

import { Client } from "revolt.js";
import { config } from "./config.js";
import { BotFramework } from "./modules/framework.js";

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
