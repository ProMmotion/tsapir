import { Model } from "sequelize";
import IBaseRole from "./IBaseRole";
import IBaseUser from "./IBaseUser";
import IBaseRoleRight from "./IBaseRoleRight";
import IBaseRolePropertyRight from "./IBaseRolePropertyRight";

export default interface IModelService {
	readonly RoleModel: typeof Model<IBaseRole>;
	readonly RoleRightModel: typeof Model<IBaseRoleRight>;
	readonly RolePropertyRightModel: typeof Model<IBaseRolePropertyRight>;
	readonly UserModel: typeof Model<IBaseUser>;
}
