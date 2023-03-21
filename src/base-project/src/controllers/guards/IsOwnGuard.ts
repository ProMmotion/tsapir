import {} from "tsapir";

export class IsOwnGuard implements APIGuard {
	async handle(
		req: APIIncomingMessage,
		managers: ManagerService
	): Promise<HttpStatusCodes> {
		if (req.method === HttpMethods.GET)
			throw new Error("IsOwnGuard doesn't work with GET methods");
		if (req.entityType && req.body && req.user) {
			switch (req.entityType) {
				case "Server":
					try {
						const s = (
							await managers.ServersManager.Get({
								where: { id: req.body.id }
							})
						)[0];
						if (req.user.email === s.owner) {
							return HttpStatusCodes.OK;
						}
					} catch (e) {
						return HttpStatusCodes.BADREQUEST;
					}
					break;
				case "User":
					try {
						const u = (
							await managers.UsersManager.Get({
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
