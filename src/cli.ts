#!/usr/bin/env node

import Generate from "./commands/generate";
import Help from "./commands/help";
import New from "./commands/new";

const args = process.argv.slice(2);
if (args.length === 0) {
	console.info("You might provide at least 1 argument");
	console.info(Help());
} else {
	switch (args[0]) {
		case "n":
		case "new":
			New(args.length > 1 ? args[1] : "");
			break;
		case "h":
		case "help":
			Help();
			break;
		case "g":
		case "generate":
			Generate();
			break;
	}
}
