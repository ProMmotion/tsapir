import { IManagerService } from "tsapir";
import { RolePropertyRightsManager } from "./managers/RolePropertyRightsManager";
import { RoleRightsManager } from "./managers/RoleRightsManager";
import { RolesManager } from "./managers/RolesManager";
import { UsersManager } from "./managers/UsersManager";

export class ManagerService implements IManagerService {
	public readonly RoleManager: RolesManager;
	public readonly RoleRightManager: RoleRightsManager;
	public readonly RolePropertyRightManager: RolePropertyRightsManager;
	public readonly UserManager: UsersManager;
	constructor() {
		this.RoleManager = new RolesManager();
		this.RoleRightManager = new RoleRightsManager();
		this.RolePropertyRightManager = new RolePropertyRightsManager();
		this.UserManager = new UsersManager();
	}
}
