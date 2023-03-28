import IModelService from "../entities/IModelService";
import BaseManager from "./BaseManager";

export default interface IManagerService {
	readonly modelService: IModelService;
	readonly RoleManager: BaseManager<any>;
	readonly RoleRightManager: BaseManager<any>;
	readonly RolePropertyRightManager: BaseManager<any>;
	readonly UserManager: BaseManager<any>;
}
