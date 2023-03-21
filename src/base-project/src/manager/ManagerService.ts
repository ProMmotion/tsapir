import { ModelService } from "../entities/ModelService";
import { IModelService } from "../entities/interfaces/IModelService";
import { IManagerService } from "./interfaces/IManagerService";
import { RolePropertyRightsManager } from "./managers/RolePropertyRightsManager";
import { RoleRightsManager } from "./managers/RoleRightsManager";
import { RolesManager } from "./managers/RolesManager";
import { UsersManager } from "./managers/UsersManager";

export class ManagerService implements IManagerService {
	private readonly modelService: IModelService;
	public readonly RolesManager: RolesManager;
	public readonly RoleRightsManager: RoleRightsManager;
	public readonly RolePropertyRightsManager: RolePropertyRightsManager;
	public readonly UsersManager: UsersManager;
	constructor() {
		this.modelService = new ModelService();
		this.RolesManager = new RolesManager(this.modelService);
		this.RoleRightsManager = new RoleRightsManager(this.modelService);
		this.RolePropertyRightsManager = new RolePropertyRightsManager(
			this.modelService
		);
		this.UsersManager = new UsersManager(this.modelService);
	}
}
