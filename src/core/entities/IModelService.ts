import { Model } from "sequelize";
import { ExtendsType } from "../utils/Types";

export default interface IModelService {
	readonly RoleModel: ExtendsType<Model>;
	readonly RoleRightModel: ExtendsType<Model>;
	readonly RolePropertyRightModel: ExtendsType<Model>;
	readonly UserModel: ExtendsType<Model>;
}
