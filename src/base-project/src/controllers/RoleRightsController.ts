import { ServerResponse } from "http";
import { FindOptions } from "sequelize";
import { Right } from "../../core/utils/Right";
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
import { IRoleRight } from "../entities/models/RoleRight";
import { ManagerService } from "../manager/ManagerService";

// path: /api/rolerights
export class RoleRightsController extends BaseController {
	constructor(ms: ManagerService) {
		super(ms);
		this.subroutes = [
			{
				route: "/me",
				method: HttpMethods.GET,
				guards: [AuthorizationGuard],
				command: (req, res) => this.GetMyPermissions(req, res)
			},
			{
				route: "",
				method: HttpMethods.GET,
				guards: [AuthorizationGuard, ReadGuard],
				command: (req, res) => this.Get(req, res)
			},
			{
				route: "",
				method: HttpMethods.POST,
				guards: [AuthorizationGuard, CreateGuard],
				command: (req, res) => this.Create(req, res)
			},
			{
				route: "",
				method: HttpMethods.PUT,
				guards: [AuthorizationGuard, UpdateGuard],
				command: (req, res) => this.Update(req, res)
			},
			{
				route: "",
				method: HttpMethods.DELETE,
				guards: [AuthorizationGuard, DeleteGuard],
				command: (req, res) => this.Delete(req, res)
			}
		];
	}

	async GetMyPermissions(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise<APIResponse>((resolve, reject) => {
			if (req.user == null || req.user.roleId == null) {
				reject(
					new APIError(
						HttpStatusCodes.BADREQUEST,
						"User Role not found"
					)
				);
			}
			this.managerService.RoleRightsManager.Get({
				where: { roleId: req.user?.roleId }
			})
				.then((rrs) => {
					resolve({
						body: rrs,
						contentType: ContentTypes.JSON,
						status: HttpStatusCodes.OK
					});
				})
				.catch((e) =>
					reject(new APIError(HttpStatusCodes.BADREQUEST, e))
				);
		});
	}
	async Get(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise<APIResponse>((resolve, reject) => {
			let opts: FindOptions<IRoleRight> | undefined = undefined;
			try {
				if (req.query != null) {
					opts = ODataParser.Parse<IRoleRight>(req.query);
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
			this.managerService.RoleRightsManager.Get(opts)
				.then((rrs) => {
					resolve({
						body: rrs,
						contentType: ContentTypes.JSON,
						status: HttpStatusCodes.OK
					});
				})
				.catch((e) =>
					reject(new APIError(HttpStatusCodes.BADREQUEST, e))
				);
		});
	}
	async Create(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise((resolve, reject) => {
			if (req.body != undefined) {
				try {
					const roleRight = <IRoleRight>Object.assign(
						{
							id: 0,
							roleId: 0,
							entityType: "",
							right: Right.None
						},
						req.body
					);
					this.managerService.RoleRightsManager.Add(roleRight)
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
					const roleRight = <IRoleRight>Object.assign(
						{
							id: 0,
							roleId: 0,
							entityType: "",
							right: Right.None
						},
						req.body
					);
					if (roleRight.id == 0) {
						reject(
							new APIError(
								HttpStatusCodes.BADREQUEST,
								"RoleRight identifier not specified"
							)
						);
						return;
					}
					this.managerService.RoleRightsManager.Update(roleRight)
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
					const roleRight = <IRoleRight>Object.assign(
						{
							id: 0,
							roleId: 0,
							entityType: "",
							right: Right.None
						},
						req.body
					);
					if (roleRight.id == 0) {
						reject(
							new APIError(
								HttpStatusCodes.BADREQUEST,
								"RoleRight identifier not specified"
							)
						);
						return;
					}
					this.managerService.RoleRightsManager.Remove(roleRight)
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
