const fs = require("fs/promises");

export async function getAllEntityTypes(): Promise<
	{ model: string; properties: string[] }[]
> {
	const folder = "./dist/entities/";
	const files = ((await fs.readdir(folder)) as string[]).filter((f) =>
		f.endsWith(".js")
	);
	const model: { model: string; properties: string[] }[] = [];
	for (const file of files) {
		const content: string = await fs.readFile(`${folder}${file}`, {
			encoding: "utf-8"
		});
		let readingProperties = false;
		let modelName = "";
		for (const line of content.split("\r\n")) {
			if (/^(exports.)+([a-zA-Z]+(ModelName))/.test(line)) {
				modelName = line.split(" = ")[1].replace(/["';]/g, "");
				model.push({
					model: modelName,
					properties: []
				});
				readingProperties = true;
			}
			if (readingProperties && /[a-zA-Z]+\: {/g.test(line)) {
				model
					.find((m) => m.model === modelName)
					?.properties.push(line.split(":")[0].trim());
			}
		}
	}
	return model;
}
