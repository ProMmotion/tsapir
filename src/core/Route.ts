import { BaseController } from "./controller/BaseController";

export interface Route {
	route: string;
	controller: BaseController;
	entityType?: string;
}
