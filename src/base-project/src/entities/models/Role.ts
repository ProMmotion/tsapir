import { DataTypes, Model } from "sequelize";
import IBaseRole from "../../../core/entities/BaseRole";

export interface IRole extends IBaseRole {}

export class Role extends Model<IRole> {}

export const RoleModelName = "Role";

export const RoleDbConf = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	name: {
		type: DataTypes.STRING,
		allowNull: false
	}
};
