import { APIGuard } from "./APIGuard";
import APIIncomingMessage from "../../APIIncomingMessage";
import HttpStatusCodes from "../../enums/HttpStatusCodes";
import { verify } from "jsonwebtoken";
import IManagerService from "../../manager/IManagerService";

export default class AuthorizationGuard implements APIGuard {
	async handle(
		req: APIIncomingMessage,
		managers: IManagerService
	): Promise<HttpStatusCodes> {
		const token = req.headers.authorization?.replace("Bearer ", "");
		if (token != null) {
			// verify token
			try {
				const decoded = verify(
					token,
					process.env.API_PRIVATE_KEY ?? ""
				);
				if (typeof decoded != "string") {
					const real = (
						await managers.UserManager.Get({
							where: { id: decoded.userId }
						})
					)[0];
					if (real.roleId !== decoded.roleId) {
						throw new Error("Error in token");
					}
					req.user = {
						id: decoded.userId,
						roleId: decoded.roleId
					};
				}
				return HttpStatusCodes.OK;
			} catch (e) {
				return HttpStatusCodes.BADREQUEST;
			}
		} else {
			return HttpStatusCodes.UNAUTHORIZE;
		}
	}
}
