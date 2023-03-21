import { ServerResponse } from "http";
import { APIError } from "../APIError";
import { APIIncomingMessage } from "../APIIncomingMessage";
import { APIResponse } from "../APIResponse";
import { HttpMethods } from "../enums/HttpMethods";
import { HttpStatusCodes } from "../enums/HttpStatusCodes";
import { findMatchingRoute, parseRouteParam } from "../utils/utils";

import { APIControllerMethod } from "../APIControllerMethod";
import { handleGuards } from "./guards/APIGuard";
import { ContentTypes } from "../enums/ContentTypes";
import IManagerService from "../manager/IManagerService";

export abstract class BaseController {
	protected managerService: IManagerService;

	protected subroutes: APIControllerMethod[] = [];

	constructor(ms: IManagerService) {
		this.managerService = ms;
	}
	DispatchRequest(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise<APIResponse>((resolve, reject) => {
			try {
				const querystring = req.url?.split("?", 2);
				if (querystring != undefined && querystring.length === 2) {
					req.query = decodeURI(querystring[1]);
				}
			} catch (e) {
				console.error(e);
			}
			let data = "";
			req.on("data", (d: Buffer) => {
				data += d;
				if (data.length > 1e6) {
					reject(
						new APIError(HttpStatusCodes.TOOLARGE, "Too much data")
					);
					return;
				}
			});
			req.on("end", async () => {
				req.body = data !== "" ? JSON.parse(data) : "";
				let response!: Promise<APIResponse>;
				if (
					req.method === HttpMethods.GET ||
					req.method === HttpMethods.POST ||
					req.method === HttpMethods.PUT ||
					req.method === HttpMethods.DELETE
				) {
					const temp = findMatchingRoute(
						req.subRoute || "",
						this.subroutes
					);
					if (temp != null) {
						req.paramRoute = parseRouteParam(
							req.subRoute || "",
							temp.route
						);
						await handleGuards(
							req,
							this.managerService,
							temp.guards ? temp.guards : []
						)
							.then(() => {
								response = temp.command(req, res);
							})
							.catch((e: APIError) => {
								response = new Promise<APIResponse>(
									(resolve, reject) => reject(e)
								);
							});
					} else {
						response = new Promise<APIResponse>((resolve, reject) =>
							reject(
								new APIError(
									HttpStatusCodes.NOTFOUND,
									"Couldn't find any controller matching with given route"
								)
							)
						);
					}
				} else if (req.method === HttpMethods.OPTIONS) {
					response = new Promise<APIResponse>((resolve, reject) => {
						resolve({
							body: null,
							contentType: ContentTypes.JSON,
							status: HttpStatusCodes.OK
						});
					});
				} else {
					response = new Promise<APIResponse>((resolve, reject) =>
						reject(
							new APIError(
								HttpStatusCodes.NOTALLOWED,
								"Mehod not supported"
							)
						)
					);
				}

				response.then((r) => resolve(r)).catch((e) => reject(e));
				return;
			});
		});
	}
}
