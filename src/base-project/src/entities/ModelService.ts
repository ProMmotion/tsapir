import { IModelService } from "./interfaces/IModelService";
import { Role } from "./models/Role";
import { RolePropertyRight } from "./models/RolePropertyRight";
import { RoleRight } from "./models/RoleRight";
import { User } from "./models/User";

export class ModelService implements IModelService {
	public readonly RoleModel: typeof Role;
	public readonly RolePropertyRightModel: typeof RolePropertyRight;
	public readonly RoleRightModel: typeof RoleRight;
	public readonly UserModel: typeof User;
	constructor() {
		this.RoleModel = Role;
		this.RolePropertyRightModel = RolePropertyRight;
		this.RoleRightModel = RoleRight;
		this.UserModel = User;
	}
}
