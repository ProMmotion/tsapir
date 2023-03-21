import { DataTypes, Model } from "sequelize";
import { Role } from "./Role";
import IBaseRoleRight from "../../../core/entities/BaseRoleRight";

export interface IRoleRight extends IBaseRoleRight {}

export class RoleRight extends Model<IRoleRight> {}

export const RoleRightModelName = "RoleRight";

export const RoleRightDbConf = {
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
