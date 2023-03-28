import HttpStatusCodes from "../../enums/HttpStatusCodes";
import APIIncomingMessage from "../../APIIncomingMessage";
import { canRead } from "../../Right";
import { APIGuard } from "./APIGuard";
import IManagerService from "../../manager/IManagerService";

export default class ReadGuard implements APIGuard {
	async handle(
		req: APIIncomingMessage,
		managers: IManagerService
	): Promise<HttpStatusCodes> {
		const roleId = req.user?.roleId;
		const entityType = req.entityType;
		if (roleId != null && entityType != null) {
			const r = (
				await managers.RoleRightManager.Get({
					where: { roleId, entityType }
				})
			)[0];
			if (canRead(r.right)) {
				return HttpStatusCodes.OK;
			} else {
				return HttpStatusCodes.NOTALLOWED;
			}
		}
		return HttpStatusCodes.NOTALLOWED;
	}
}
