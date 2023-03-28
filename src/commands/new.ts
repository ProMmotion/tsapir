export default async function New(name: string) {
	let appName = name;
	const readline = require("readline");
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});
	rl.on("close", async () => {
		console.log(`Starting to create ${appName} App !`);
		const fs = require("fs");
		try {
			const exec = require("child_process").exec;
			const path = `${process.cwd()}\\${appName}`;
			fs.mkdir(path, (mkDirErr: Error) => {
				if (mkDirErr) throw mkDirErr;
				fs.cp(
					`${__dirname}\\..\\base-project\\`,
					`${path}\\`,
					{ force: true, recursive: true },
					(cpFileErr: Error) => {
						if (cpFileErr) throw cpFileErr;
						fs.readFile(
							`${path}\\package.json`,
							{ encoding: "utf8" },
							(e: Error, d: string) => {
								if (e) throw e;
								exec(
									"npm view tsapir version",
									(
										cmdErr: Error,
										stdout: string,
										stderr: Error
									) => {
										if (cmdErr) throw cmdErr;
										if (stderr) throw stderr;
										fs.writeFile(
											`${path}\\package.json`,
											d
												.replace(
													"##project_name##",
													appName
												)
												.replace(
													"##tsapir_version##",
													stdout
														.trim()
														.replace("\n", "")
														.replace("\t", "")
												),
											"utf8",
											(err: Error) => {
												if (err) throw err;
												console.log(
													`Successfuly created ${appName} !`
												);
												exec(
													`cd ${path} && npm i`,
													(
														cmdErr: Error,
														stdout: string,
														stderr: Error
													) => {
														if (cmdErr)
															throw cmdErr;
														if (stderr)
															throw stderr;
														console.log(
															"Successfuly installed npm packages"
														);
													}
												);
											}
										);
									}
								);
							}
						);
					}
				);
			});
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
