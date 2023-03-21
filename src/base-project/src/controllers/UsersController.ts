import { ServerResponse } from "http";
import { FindOptions } from "sequelize/types";
import { ManagerService } from "../manager/ManagerService";
import {
	canRead,
	canUpdate,
	getNotMatchingValueProperties
} from "../../core/utils/utils";
import { BaseController } from "../../core/controller/BaseController";
import { HttpMethods } from "../../core/enums/HttpMethods";
import { AuthorizationGuard } from "../../core/guards/AuthorizationGuard";
import { ReadGuard } from "../../core/guards/ReadGuard";
import { UpdateGuard } from "../../core/guards/UpdateGuard";
import { IsOwnGuard } from "../../core/guards/IsOwnGuard";
import { DeleteGuard } from "../../core/guards/DeleteGuard";
import { APIError } from "../../core/APIError";
import { APIIncomingMessage } from "../../core/APIIncomingMessage";
import { APIResponse } from "../../core/APIResponse";
import { ODataParser } from "../../core/ODataParser";
import { ContentTypes } from "../../core/enums/ContentTypes";
import { HttpStatusCodes } from "../../core/enums/HttpStatusCodes";
import { IUser } from "../entities/models/User";

// path: /api/users
export class UsersController extends BaseController {
	constructor(ms: ManagerService) {
		super(ms);
		this.subroutes = [
			{
				route: "",
				method: HttpMethods.GET,
				guards: [AuthorizationGuard, ReadGuard],
				command: (req, res) => this.Get(req, res)
			},
			{
				route: "",
				method: HttpMethods.POST,
				command: (req, res) => this.Create(req, res)
			},
			{
				route: "",
				method: HttpMethods.PUT,
				guards: [AuthorizationGuard, [UpdateGuard, IsOwnGuard]],
				command: (req, res) => this.Update(req, res)
			},
			{
				route: "",
				method: HttpMethods.DELETE,
				guards: [AuthorizationGuard, DeleteGuard],
				command: (req, res) => this.Delete(req, res)
			},
			{
				route: "/me",
				method: HttpMethods.GET,
				guards: [AuthorizationGuard],
				command: (req, res) => this.GetMe(req, res)
			}
		];
	}

	async GetMe(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise<APIResponse>((resolve, reject) => {
			if (req.user == null) {
				reject(
					new APIError(
						HttpStatusCodes.BADREQUEST,
						"User authorization token not found"
					)
				);
			}
			this.managerService.RolePropertyRightManager.Get({
				where: { roleId: req.user?.roleId, entityType: "User" }
			})
				.then((exclusion) => {
					this.managerService.UsersManager.Get(
						{ where: { id: req.user?.id }, include: Character },
						[
							...exclusion
								.filter((e) => !canRead(e.right))
								.map((e) => e.property as keyof IUser),
							"password"
						]
					)
						.then((user) =>
							resolve({
								body: { data: user[0] },
								status: HttpStatusCodes.OK,
								contentType: ContentTypes.JSON
							})
						)
						.catch((e) =>
							reject(
								new APIError(
									HttpStatusCodes.BADREQUEST,
									`Error while processing request: ${e}`
								)
							)
						);
				})
				.catch((e) =>
					reject(
						new APIError(
							HttpStatusCodes.BADREQUEST,
							`Error while retreiving excluded properties: ${e}`
						)
					)
				);
		});
	}
	async Get(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise((resolve, reject) => {
			let opts: FindOptions<IUser> | undefined = undefined;
			try {
				if (req.query != null) {
					opts = ODataParser.Parse<IUser>(req.query);
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
				where: { roleId: req.user?.roleId, entityType: "User" }
			})
				.then((exclusion) => {
					this.managerService.UsersManager.Get(opts, [
						...exclusion
							.filter((e) => !canRead(e.right))
							.map((e) => e.property as keyof IUser),
						"password"
					])
						.then((users) => {
							resolve({
								contentType: ContentTypes.JSON,
								status: HttpStatusCodes.OK,
								body: users
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
				.catch((e) =>
					reject(
						new APIError(
							HttpStatusCodes.BADREQUEST,
							`Error while retreiving excluded properties: ${e}`
						)
					)
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
					const user = <IUser>Object.assign(
						{
							status: 0,
							birthday: new Date(),
							createdAt: new Date(),
							id: 0,
							nationality: "en",
							nickName: "",
							email: "",
							password: "",
							roleId: 2,
							active: true
						},
						req.body
					);
					this.managerService.UsersManager.Add(user)
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
			const catching = (e: any) =>
				reject(new APIError(HttpStatusCodes.BADREQUEST, e));
			if (req.body != undefined) {
				try {
					const user = <IUser>Object.assign(
						{
							status: 0,
							birthday: new Date(),
							createdAt: new Date(),
							id: 0,
							nationality: "en",
							nickName: "",
							email: "",
							password: "",
							roleId: 0,
							active: true
						},
						req.body
					);
					if (user.id == 0) {
						catching("User id not specified");
						return;
					}
					this.managerService.RolePropertyRightManager.Get({
						where: { entityType: "User", roleId: req.user?.roleId }
					})
						.then((rpr) => {
							this.managerService.UsersManager.Get({
								where: { id: user.id }
							}).then((real) => {
								if (real[0]) {
									const rprFields = rpr
										.filter((e) => canUpdate(e.right))
										.map((e) => e.property);
									const authorized =
										getNotMatchingValueProperties(
											user,
											real[0]
										).filter((u) => rprFields.includes(u));
									if (authorized.length === 0) {
										catching(
											"There is no property you're allowed to update"
										);
									}
									this.managerService.UsersManager.Update(
										user,
										authorized
									)
										.then((u) => {
											resolve({
												status: HttpStatusCodes.OK,
												contentType: ContentTypes.JSON,
												body: u
											});
										})
										.catch(catching);
								}
							});
						})
						.catch(catching);
				} catch (e) {
					catching("Parsing Error");
				}
			} else {
				catching("No result");
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
					const user = <IUser>Object.assign(
						{
							status: 0,
							birthday: new Date(),
							createdAt: new Date(),
							id: 0,
							nationality: "en",
							nickName: "",
							email: "",
							password: "",
							roleId: 0,
							active: true
						},
						req.body
					);
					if (user.id == 0) {
						reject(
							new APIError(
								HttpStatusCodes.BADREQUEST,
								"User identifier not specified"
							)
						);
						return;
					}
					this.managerService.UsersManager.Remove(user)
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
