import { Model } from "sequelize";
import IBaseRole from "./IBaseRole";
import IBaseUser from "./IBaseUser";
import IBaseRoleRight from "./IBaseRoleRight";
import IBaseRolePropertyRight from "./IBaseRolePropertyRight";
import { ClassType } from "../utils/ClassType";

export default interface IModelService {
	readonly RoleModel: ClassType<Model<IBaseRole>>;
	readonly RoleRightModel: ClassType<Model<IBaseRoleRight>>;
	readonly RolePropertyRightModel: ClassType<Model<IBaseRolePropertyRight>>;
	readonly UserModel: ClassType<Model<IBaseUser>>;
}
