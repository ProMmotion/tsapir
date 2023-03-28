import { IManagerService, IModelService } from "tsapir";
import { ModelService } from "../entities/ModelService";
import { RolePropertyRightsManager } from "./managers/RolePropertyRightsManager";
import { RoleRightsManager } from "./managers/RoleRightsManager";
import { RolesManager } from "./managers/RolesManager";
import { UsersManager } from "./managers/UsersManager";

export class ManagerService implements IManagerService {
	private readonly modelService: IModelService;
	public readonly RoleManager: RolesManager;
	public readonly RoleRightManager: RoleRightsManager;
	public readonly RolePropertyRightManager: RolePropertyRightsManager;
	public readonly UserManager: UsersManager;
	constructor() {
		this.modelService = new ModelService();
		this.RoleManager = new RolesManager(this.modelService);
		this.RoleRightManager = new RoleRightsManager(this.modelService);
		this.RolePropertyRightManager = new RolePropertyRightsManager(
			this.modelService
		);
		this.UserManager = new UsersManager(this.modelService);
	}
}
