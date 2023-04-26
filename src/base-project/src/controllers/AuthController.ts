import bcrypt from "bcrypt";
import { ServerResponse } from "http";
import { sign } from "jsonwebtoken";
import { Op } from "sequelize";
import {
	HttpStatusCodes,
	HttpMethods,
	ContentTypes,
	APIResponse,
	APIIncomingMessage,
	APIError,
	BaseController
} from "tsapir";
import { IUser } from "../entities/User";
import { ManagerService } from "../manager/ManagerService";
import { GetPrivateKey } from "../utils/utils";

// path: /api/authorize
export class AuthController extends BaseController {
	constructor(ms: ManagerService) {
		super(ms);
		this.subroutes = [
			{
				route: "/login",
				method: HttpMethods.POST,
				command: (req, res) => this.login(req, res)
			},
			{
				route: "/signin",
				method: HttpMethods.POST,
				command: (req, res) => this.signin(req, res)
			},
			{
				route: "/password/new",
				method: HttpMethods.POST,
				command: (req, res) => this.renewPassword(req, res)
			},
			{
				route: "/password/forgot",
				method: HttpMethods.POST,
				command: (req, res) => this.forgotPassword(req, res)
			}
		];
	}
	async signin(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise((resolve, reject) => {
			if (req.body != undefined) {
				const signinForm = Object.assign(
					{ login: "", email: "", birth: new Date(), password: "" },
					req.body
				);
				this.managerService.UserManager.Add({
					id: "",
					birthday: signinForm.birth,
					email: signinForm.email,
					nickName: signinForm.login,
					password: signinForm.password,
					active: true,
					nationality: "en",
					roleId: "2",
					status: 0
				})
					.then((e) => {
						resolve({
							contentType: ContentTypes.JSON,
							status: HttpStatusCodes.OK,
							body: {
								data: sign(
									{
										userId: e.id,
										roleId: e.roleId,
										email: e.email
									},
									GetPrivateKey()
								)
							}
						});
					})
					.catch((e) =>
						reject(
							new APIError(
								HttpStatusCodes.BADREQUEST,
								"Errors in signin form"
							)
						)
					);
			} else {
				reject(
					new APIError(HttpStatusCodes.BADREQUEST, "No data found")
				);
			}
		});
	}
	async login(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		return new Promise((resolve, reject) => {
			if (req.body != undefined) {
				const loginForm = Object.assign(
					{ login: "", password: "" },
					req.body
				);
				this.managerService.UserManager.Get({
					where: {
						[Op.or]: [
							{ email: loginForm.login },
							{ nickName: loginForm.login }
						]
					}
				})
					.then((users) => {
						if (users.length === 0) {
							reject(
								new APIError(
									HttpStatusCodes.BADREQUEST,
									"Wrong Login or Password"
								)
							);
						}
						if (users.length > 1) {
							// NO NO
							// Log error and block account until update
							reject(
								new APIError(
									HttpStatusCodes.BADREQUEST,
									"Unexpected error, contact support for help"
								)
							);
						}
						const u = <IUser>users.shift();
						bcrypt
							.compare(loginForm.password, u.password)
							.then((isValid) => {
								if (isValid) {
									resolve({
										status: HttpStatusCodes.OK,
										contentType: ContentTypes.JSON,
										body: {
											data: sign(
												{
													userId: u.id,
													email: u.email,
													roleId: u.roleId
												},
												GetPrivateKey()
											)
										}
									});
								} else {
									reject(
										new APIError(
											HttpStatusCodes.BADREQUEST,
											"Wrong Login or Password"
										)
									);
								}
							});
					})
					.catch((e) => {
						reject(
							new APIError(
								HttpStatusCodes.BADREQUEST,
								"Wrong Login or Password"
							)
						);
					});
			} else {
				reject(
					new APIError(HttpStatusCodes.BADREQUEST, "No data found")
				);
			}
		});
	}
	async renewPassword(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		throw new Error("not implemented");
	}
	async forgotPassword(
		req: APIIncomingMessage,
		res: ServerResponse
	): Promise<APIResponse> {
		throw new Error("not implemented");
	}
}
