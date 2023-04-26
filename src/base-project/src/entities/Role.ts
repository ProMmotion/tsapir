import { DataTypes, Model } from "sequelize";
import { IBaseRole } from "tsapir";

export interface IRole extends IBaseRole {
	id: string;
	name: string;
}

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
