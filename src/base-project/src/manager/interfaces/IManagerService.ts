import { RolePropertyRightsManager } from "../managers/RolePropertyRightsManager";
import { RoleRightsManager } from "../managers/RoleRightsManager";
import { RolesManager } from "../managers/RolesManager";
import { UsersManager } from "../managers/UsersManager";

export interface IManagerService {
	RolesManager: RolesManager;
	RoleRightsManager: RoleRightsManager;
	RolePropertyRightsManager: RolePropertyRightsManager;
	UsersManager: UsersManager;
}
