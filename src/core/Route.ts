import BaseController from "./controller/BaseController";

export default interface Route {
	route: string;
	controller: BaseController;
	entityType?: string;
}
