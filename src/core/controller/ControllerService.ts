import { ServerResponse } from "http";
import { APIIncomingMessage } from "../APIIncomingMessage";
import Route from "../Route";
import APIResponse from "../APIResponse";
import APIError from "../APIError";
import { HttpStatusCodes } from "../enums";

export class ControllerService {
	public RequestHandler(
		req: APIIncomingMessage,
		res: ServerResponse,
		routes: Route[]
	): void {
		if (
			typeof req.url === "string" &&
			req.url !== undefined &&
			req.url !== null
		) {
			const URL: string = req.url || "";
			const TIMER = new Date(Date.now());
			const CONTROLLERobj: Route | undefined = routes.find((obj) =>
				URL.startsWith(obj.route)
			);
			const ip = req.socket.remoteAddress;
			if (CONTROLLERobj !== undefined) {
				req.entityType = CONTROLLERobj.entityType;
				req.subRoute = URL.replace(CONTROLLERobj.route, "").split(
					"?"
				)[0];
				CONTROLLERobj.controller
					.DispatchRequest(req, res)
					.then((response: APIResponse) => {
						if (response !== null) {
							response.body = response.body
								? JSON.stringify(response.body)
								: "";
							res.writeHead(response.status, {
								"Content-Length": Buffer.byteLength(
									response.body
								),
								"Content-Type": response.contentType,
								"Access-Control-Allow-Origin": "*",
								"Access-Control-Allow-Methods":
									"GET, POST, PUT, DELETE",
								"Access-Control-Allow-Headers": "*"
							}).end(response.body);
						}
					})
					.catch((e: APIError) => {
						res.writeHead(e.errorStatus, {
							"Access-Control-Allow-Origin": "*",
							"Access-Control-Allow-Methods":
								"GET, POST, PUT, DELETE",
							"Access-Control-Allow-Headers": "*"
						}).end(e.message);
					})
					.finally(() => {
						console.info(
							`${
								res.statusCode === 200
									? "\x1b[32m"
									: res.statusCode === 400
									? "\x1b[31m"
									: "\x1b[33m"
							}%s\x1b[0m`,
							`[${TIMER.toISOString()}] (${req.method}-${
								res.statusCode
							}) ${req.url} - ${
								new Date().getTime() - TIMER.getTime()
							}ms`
						);
					});
				return;
			}
		}
		res.writeHead(HttpStatusCodes.NOTFOUND).end();
		return;
	}
}
