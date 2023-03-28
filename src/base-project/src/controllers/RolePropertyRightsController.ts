import { ServerResponse } from "http";
import { FindOptions } from "sequelize";
import {
	HttpStatusCodes,
	HttpMethods,
	ContentTypes,
	UpdateGuard,
	ReadGuard,
	DeleteGuard,
	CreateGuard,
	AuthorizationGuard,
	ODataParser,
	APIResponse,
	APIIncomingMessage,
	APIError,
	BaseController,
	Right
} from "tsapir";
import { IRolePropertyRight } from "../entities/models/RolePropertyRight";
import { ManagerService } from "../manager/ManagerService";

export class RolePropertyRightsController extends BaseController {
	constructor(ms: ManagerService) {
		super(ms);
		this.subroutes = [
			{
				route: "/entity/:entityType",
				command: (req, res) => this.GetExclusionForEntity(req, res),
				method: HttpMethods.GET,
				guards: [AuthorizationGuard, ReadGuard]
			},
			{
				route: "/role/:role",
				command: (req, res) => this.GetExclusionForRole(req, res),
				method: HttpMethods.GET,
				guards: [AuthorizationGuard, ReadGuard]
			},
			{
				route: "",
				command: (req, res) => this.Get(req, res),
				method: HttpMethods.GET,
				guards: [AuthorizationGuard, ReadGuard]
			},
			{
				route: "",
				command: (req, res) => this.Create(req, res),
				method: HttpMethods.POST,
				guards: [AuthorizationGuard, CreateGuard]
			},
			{
				route: "",
				command: (req, res) => this.Update(req, res),
				method: HttpMethods.PUT,
				guards: [AuthorizationGuard, UpdateGuard]
			},
			{
				route: "",
				command: (req, res) => this.Delete(req, res),
				method: HttpMethods.DELETE,
				guards: [AuthorizationGuard, DeleteGuard]
			}
		];
	}
	async GetExclusionForEntity(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise<APIResponse>((resolve, reject) => {
			if (req.paramRoute == null || req.paramRoute.entityType == null) {
				reject(
					new APIError(
						HttpStatusCodes.BADREQUEST,
						"Missing argument: entity type"
					)
				);
			}
			this.managerService.RolePropertyRightManager.Get({
				where: { entityType: req.paramRoute?.entityType }
			})
				.then((data) => {
					resolve({
						body: data,
						contentType: ContentTypes.JSON,
						status: HttpStatusCodes.OK
					});
				})
				.catch((e) =>
					reject(new APIError(e, "Error while retreiving data"))
				);
		});
	}
	async GetExclusionForRole(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise<APIResponse>((resolve, reject) => {
			if (req.paramRoute == null || req.paramRoute.role == null) {
				reject(
					new APIError(
						HttpStatusCodes.BADREQUEST,
						"Missing argument: entity type"
					)
				);
			}
			this.managerService.RolePropertyRightManager.Get({
				where: { roleId: req.paramRoute?.role }
			})
				.then((data) => {
					resolve({
						body: data,
						contentType: ContentTypes.JSON,
						status: HttpStatusCodes.OK
					});
				})
				.catch((e) =>
					reject(new APIError(e, "Error while retreiving data"))
				);
		});
	}
	async Get(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise<APIResponse>((resolve, reject) => {
			let opts: FindOptions<IRolePropertyRight> | undefined = undefined;
			try {
				if (req.query != null) {
					opts = ODataParser.Parse<IRolePropertyRight>(req.query);
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
			this.managerService.RolePropertyRightManager.Get(opts)
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
					const roleRight = <IRolePropertyRight>Object.assign(
						{
							id: 0,
							roleId: 0,
							entityType: "",
							right: Right.None,
							property: ""
						},
						req.body
					);
					this.managerService.RoleRightManager.Add(roleRight)
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
					const roleRight = <IRolePropertyRight>Object.assign(
						{
							id: 0,
							roleId: 0,
							entityType: "",
							right: Right.None,
							property: ""
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
					this.managerService.RoleRightManager.Update(roleRight)
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
					const roleRight = <IRolePropertyRight>Object.assign(
						{
							id: 0,
							roleId: 0,
							entityType: "",
							right: Right.None,
							property: ""
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
					this.managerService.RoleRightManager.Remove(roleRight)
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
