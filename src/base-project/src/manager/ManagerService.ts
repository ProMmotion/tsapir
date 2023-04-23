import { IManagerService, ModelService } from "tsapir";
import { RolePropertyRightsManager } from "./managers/RolePropertyRightsManager";
import { RoleRightsManager } from "./managers/RoleRightsManager";
import { RolesManager } from "./managers/RolesManager";
import { UsersManager } from "./managers/UsersManager";
import { User } from "../entities/User";
import { Role } from "../entities/Role";
import { RoleRight } from "../entities/RoleRight";
import { RolePropertyRight } from "../entities/RolePropertyRight";
import Entities from "../entities/Entities";

export class ManagerService implements IManagerService {
	readonly modelService: ModelService;
	public readonly RoleManager: RolesManager;
	public readonly RoleRightManager: RoleRightsManager;
	public readonly RolePropertyRightManager: RolePropertyRightsManager;
	public readonly UserManager: UsersManager;
	constructor() {
		this.modelService = new ModelService({
			[Entities.User]: User,
			[Entities.Role]: Role,
			[Entities.RoleRight]: RoleRight,
			[Entities.RolePropertyRight]: RolePropertyRight
		});
		this.RoleManager = new RolesManager(this.modelService);
		this.RoleRightManager = new RoleRightsManager(this.modelService);
		this.RolePropertyRightManager = new RolePropertyRightsManager(
			this.modelService
		);
		this.UserManager = new UsersManager(this.modelService);
	}
}
