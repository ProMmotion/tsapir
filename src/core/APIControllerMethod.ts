import { ServerResponse } from "http";
import APIIncomingMessage from "./APIIncomingMessage";
import { APIGuard } from "./controller/guards/APIGuard";
import { ClassType } from "./utils/Types";
import HttpMethods from "./enums/HttpMethods";
import APIResponse from "./APIResponse";

export default interface APIControllerMethod {
	route: string;
	method: HttpMethods;
	guards?: (ClassType<APIGuard> | ClassType<APIGuard>[])[]; // Array of Guard acts like: OR. If one of the guard in the array is ok then ok
	command: (
		req: APIIncomingMessage,
		res: ServerResponse
	) => Promise<APIResponse>;
}
