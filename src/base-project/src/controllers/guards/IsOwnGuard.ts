import {
	APIGuard,
	APIIncomingMessage,
	HttpStatusCodes,
	HttpMethods
} from "tsapir";
import { ManagerService } from "../../manager/ManagerService";

export class IsOwnGuard implements APIGuard {
	async handle(
		req: APIIncomingMessage,
		managers: ManagerService
	): Promise<HttpStatusCodes> {
		if (req.method === HttpMethods.GET)
			throw new Error("IsOwnGuard doesn't work with GET methods");
		if (req.entityType && req.body && req.user) {
			switch (req.entityType) {
				case "User":
					try {
						const u = (
							await managers.UserManager.Get({
								where: { id: req.body.id }
							})
						)[0];
						if (req.user.email === u.email) {
							return HttpStatusCodes.OK;
						}
					} catch (e) {
						return HttpStatusCodes.BADREQUEST;
					}
					break;
			}
		}
		return HttpStatusCodes.NOTALLOWED;
	}
}
