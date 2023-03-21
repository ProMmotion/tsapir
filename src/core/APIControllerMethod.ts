import { ServerResponse } from "http";
import { HttpMethods } from "./enums/HttpMethods";
import { APIIncomingMessage } from "./APIIncomingMessage";
import { APIResponse } from "./APIResponse";
import { APIGuard } from "./controller/guards/APIGuard";
import { Class } from "./utils/Class";

export interface APIControllerMethod {
	route: string;
	method: HttpMethods;
	guards?: (Class<APIGuard> | Class<APIGuard>[])[]; // Array of Guard acts like: OR. If one of the guard in the array is ok then ok
	command: (
		req: APIIncomingMessage,
		res: ServerResponse
	) => Promise<APIResponse>;
}
