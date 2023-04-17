import IModelService from "../entities/IModelService";
import { ExtendsType } from "../utils/Types";
import BaseManager from "./BaseManager";

export default interface IManagerService {
	readonly modelService: ExtendsType<IModelService>;
	readonly RoleManager: BaseManager<any>;
	readonly RoleRightManager: BaseManager<any>;
	readonly RolePropertyRightManager: BaseManager<any>;
	readonly UserManager: BaseManager<any>;
}
