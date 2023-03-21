import { Role } from "../models/Role";
import { RolePropertyRight } from "../models/RolePropertyRight";
import { RoleRight } from "../models/RoleRight";
import { User } from "../models/User";

export interface IModelService {
	RoleModel: typeof Role;
	RoleRightModel: typeof RoleRight;
	RolePropertyRightModel: typeof RolePropertyRight;
	UserModel: typeof User;
}
