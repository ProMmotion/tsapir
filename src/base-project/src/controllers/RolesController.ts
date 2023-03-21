import { ServerResponse } from "http";
import { FindOptions } from "sequelize/types";
import { canRead } from "../../core/utils/utils";
import { BaseController } from "../../core/controller/BaseController";
import { APIError } from "../../core/APIError";
import { APIIncomingMessage } from "../../core/APIIncomingMessage";
import { APIResponse } from "../../core/APIResponse";
import { ODataParser } from "../../core/ODataParser";
import { AuthorizationGuard } from "../../core/guards/AuthorizationGuard";
import { CreateGuard } from "../../core/guards/CreateGuard";
import { DeleteGuard } from "../../core/guards/DeleteGuard";
import { ReadGuard } from "../../core/guards/ReadGuard";
import { UpdateGuard } from "../../core/guards/UpdateGuard";
import { ContentTypes } from "../../core/enums/ContentTypes";
import { HttpMethods } from "../../core/enums/HttpMethods";
import { HttpStatusCodes } from "../../core/enums/HttpStatusCodes";
import { IRole } from "../entities/models/Role";
import { ManagerService } from "../manager/ManagerService";

// path: /api/roles
export class RolesController extends BaseController {
	constructor(ms: ManagerService) {
		super(ms);
		this.subroutes = [
			{
				route: "",
				guards: [AuthorizationGuard, ReadGuard],
				command: (req, res) => this.Get(req, res),
				method: HttpMethods.GET
			},
			{
				route: "",
				guards: [AuthorizationGuard, CreateGuard],
				command: (req, res) => this.Create(req, res),
				method: HttpMethods.POST
			},
			{
				route: "",
				guards: [AuthorizationGuard, UpdateGuard],
				command: (req, res) => this.Update(req, res),
				method: HttpMethods.PUT
			},
			{
				route: "",
				guards: [AuthorizationGuard, DeleteGuard],
				command: (req, res) => this.Delete(req, res),
				method: HttpMethods.DELETE
			}
		];
	}

	async Get(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise<APIResponse>((resolve, reject) => {
			let opts: FindOptions<IRole> | undefined = undefined;
			try {
				if (req.query != null) {
					opts = ODataParser.Parse<IRole>(req.query);
				}
			} catch (e) {
				reject(
					new APIError(
						HttpStatusCodes.BADREQUEST,
						"OData query incorrect"
					)
				);
				return;
			}
			this.managerService.RolePropertyRightManager.Get({
				where: { entityType: "Role", roleId: req.user?.roleId }
			})
				.then((rpr) => {
					this.managerService.RolesManager.Get(
						opts,
						rpr
							.filter((e) => !canRead(e.right))
							.map((e) => e.property as keyof IRole)
					)
						.then((roles) => {
							resolve({
								contentType: ContentTypes.JSON,
								status: HttpStatusCodes.OK,
								body: roles
							});
						})
						.catch((e) => {
							reject(
								new APIError(
									HttpStatusCodes.BADREQUEST,
									`Error while processing request: ${e}`
								)
							);
						});
				})
				.catch((e) => reject(e));
		});
	}
	async Create(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise((resolve, reject) => {
			if (req.body != undefined) {
				try {
					const role = <IRole>Object.assign(
						{
							id: 0,
							name: ""
						},
						req.body
					);
					this.managerService.RolesManager.Add(role)
						.then((u) => {
							resolve({
								status: HttpStatusCodes.OK,
								contentType: ContentTypes.JSON,
								body: u
							});
						})
						.catch((e) =>
							reject(new APIError(HttpStatusCodes.BADREQUEST, e))
						);
				} catch (e) {
					reject(
						new APIError(
							HttpStatusCodes.BADREQUEST,
							"Object parsing error"
						)
					);
				}
			} else {
				reject(
					new APIError(HttpStatusCodes.BADREQUEST, "No Data found")
				);
			}
		});
	}
	async Update(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise((resolve, reject) => {
			if (req.body != undefined) {
				try {
					const role = <IRole>Object.assign(
						{
							id: 0,
							name: ""
						},
						req.body
					);
					if (role.id == 0) {
						reject(
							new APIError(
								HttpStatusCodes.BADREQUEST,
								"Role identifier not specified"
							)
						);
						return;
					}
					this.managerService.RolesManager.Update(role)
						.then((u) => {
							resolve({
								status: HttpStatusCodes.OK,
								contentType: ContentTypes.JSON,
								body: u
							});
						})
						.catch((e) =>
							reject(new APIError(HttpStatusCodes.BADREQUEST, e))
						);
				} catch (e) {
					reject(
						new APIError(
							HttpStatusCodes.BADREQUEST,
							"Object parsing error"
						)
					);
				}
			} else {
				reject(
					new APIError(HttpStatusCodes.BADREQUEST, "No Data found")
				);
			}
		});
	}
	async Delete(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise((resolve, reject) => {
			if (req.body != undefined) {
				try {
					const role = <IRole>Object.assign(
						{
							id: 0,
							name: ""
						},
						req.body
					);
					if (role.id == 0) {
						reject(
							new APIError(
								HttpStatusCodes.BADREQUEST,
								"Role identifier not specified"
							)
						);
						return;
					}
					this.managerService.RolesManager.Remove(role)
						.then((u) => {
							resolve({
								status: HttpStatusCodes.OK,
								contentType: ContentTypes.JSON,
								body: null
							});
						})
						.catch((e) =>
							reject(new APIError(HttpStatusCodes.BADREQUEST, e))
						);
				} catch (e) {
					reject(
						new APIError(
							HttpStatusCodes.BADREQUEST,
							"Object parsing error"
						)
					);
				}
			} else {
				reject(
					new APIError(HttpStatusCodes.BADREQUEST, "No Data found")
				);
			}
		});
	}
}
