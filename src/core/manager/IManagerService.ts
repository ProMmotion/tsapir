import {ModelService} from "../entities/ModelService";
import BaseManager from "./BaseManager";

export default interface IManagerService {
	readonly modelService: ModelService;
	readonly RoleManager: BaseManager<any>;
	readonly RoleRightManager: BaseManager<any>;
	readonly RolePropertyRightManager: BaseManager<any>;
	readonly UserManager: BaseManager<any>;
}
