import APIError from "../../APIError";
import APIIncomingMessage from "../../APIIncomingMessage";
import { Class } from "../../utils/ClassType";
import IManagerService from "../../manager/IManagerService";
import HttpStatusCodes from "../../enums/HttpStatusCodes";

export abstract class APIGuard {
	abstract handle(
		req: APIIncomingMessage,
		managers: IManagerService
	): Promise<HttpStatusCodes> | HttpStatusCodes;
}
export async function handleGuards(
	req: APIIncomingMessage,
	managers: IManagerService,
	guards: (Class<APIGuard> | Class<APIGuard>[])[]
): Promise<void> {
	return new Promise<void>(async (resolve, reject) => {
		if (guards.length === 0) {
			resolve();
		}
		for (const guard of guards) {
			let guardResponse = HttpStatusCodes.NOTALLOWED;
			if (guard instanceof Array) {
				for (const subGuard of guard) {
					const instance = new subGuard();
					const tempGuardResponse = await instance.handle(
						req,
						managers
					);
					if (tempGuardResponse === HttpStatusCodes.OK) {
						guardResponse = HttpStatusCodes.OK;
						break;
					}
				}
			} else {
				const instance = new guard();
				guardResponse = await instance.handle(req, managers);
			}
			if (guardResponse !== 200) {
				reject(new APIError(guardResponse, ""));
				return;
			}
		}
		resolve();
	});
}
