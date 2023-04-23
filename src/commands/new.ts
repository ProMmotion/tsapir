export default async function New(name: string) {
	let appName = name;
	const readline = require("readline");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on("close", async () => {
		const path = require("path");
		try {
			const exec = require("child_process").exec;
			exec(
				`sh ${path.join(__dirname, "new.sh")} ${appName}`,
				(cmdErr: Error, stdout: string, stderr: Error) => {
					if (cmdErr) throw cmdErr;
					if (stderr) throw stderr;
				}
			);
		} catch (e) {
			console.error(e);
		}
	});
	if (name === "") {
		rl.question(
			"What's your application's name ? (Default: My_Awesome_App): ",
			(inp: string) => {
				appName = inp === "" ? "My_Awesome_App" : inp;
				rl.close();
			}
		);
	} else {
		rl.close();
	}
}
