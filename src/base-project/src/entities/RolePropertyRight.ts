import { DataTypes, Model } from "sequelize";
import { Role } from "./Role";
import { IBaseRolePropertyRight, Right } from "tsapir";

export interface IRolePropertyRight extends IBaseRolePropertyRight {
	id: string;
	roleId: string;
	right: Right;
	entityType: string;
	property: string;
}

export class RolePropertyRight extends Model<IRolePropertyRight> {}

export const RolePropertyRightModelName = "RolePropertyRight";

export const RolePropertyRightDbConf = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	entityType: {
		type: DataTypes.STRING,
		allowNull: false
	},
	property: {
		type: DataTypes.STRING,
		allowNull: false
	},
	right: {
		type: DataTypes.INTEGER,
		allowNull: false
	},
	roleId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: Role,
			key: "id"
		}
	}
};
