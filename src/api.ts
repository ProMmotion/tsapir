import https from "https";
import { ControllerService } from "./core/controller/ControllerService";
import APIConfig from "./core/APIConfig";
import { IncomingMessage, ServerResponse } from "http";
import { Sequelize } from "sequelize";
import Route from "./core/Route";

export default class API {
	private readonly ROUTER;
	private readonly ROUTES: Route[];
	private config: APIConfig = {
		dbConnectionString: "",
		port: 9090,
		httpsCert: "",
		httpsKey: ""
	};
	constructor(routes: Route[], config?: APIConfig) {
		this.ROUTER = new ControllerService();
		this.ROUTES = routes;
		if (config != null) this.config = { ...this.config, ...config };
	}
	async Init(
		modelInit: (sequelize: Sequelize) => Promise<void>
	): Promise<API> {
		const seq = new Sequelize(this.config.dbConnectionString as string, {
			logging: false
		});
		await seq.authenticate();
		console.info("Authentication to DB success");
		await modelInit(seq);

		return this;
	}
	Start(): void {
		https
			.createServer(
				{
					key: this.config.httpsKey,
					cert: this.config.httpsCert
				},
				(req: IncomingMessage, res: ServerResponse) =>
					this.ROUTER.RequestHandler(req, res, this.ROUTES)
			)
			.listen(this.config.port);
		console.info(
			"\x1b[32m%s\x1b[0m",
			`\nStarting API on port ${this.config.port}\n`
		);
	}
}
