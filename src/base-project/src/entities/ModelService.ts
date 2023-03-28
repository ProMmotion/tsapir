import { IModelService } from "tsapir";
import { Role } from "./models/Role";
import { RolePropertyRight } from "./models/RolePropertyRight";
import { RoleRight } from "./models/RoleRight";
import { User } from "./models/User";

export class ModelService implements IModelService {
	public readonly RoleModel = Role;
	public readonly RoleRightModel = RoleRight;
	public readonly RolePropertyRightModel = RolePropertyRight;
	public readonly UserModel = User;
}
