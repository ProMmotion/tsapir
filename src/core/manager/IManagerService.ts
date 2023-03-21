import IModelService from "../entities/IModelService";
import IBaseManager from "./IBaseManager";

export default interface ManagerService {
	readonly modelService: IModelService;
	readonly Managers: { [entityType: string]: IBaseManager<any> };
}
