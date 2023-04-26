import { DataTypes, Model } from "sequelize";
import { Role } from "./Role";
import { IBaseUser } from "tsapir";

export interface IUser extends IBaseUser {
	id: string;
	roleId: string;
	nickName: string;
	email: string;
	password: string;
	birthday: Date;
	subscribedUntil?: Date;
	bannedUntil?: Date;
	nationality: "fr" | "en";
	deletedAt?: Date;
	active: boolean;
}

export class User extends Model<IUser> {}

export const UserModelName = "User";

export const UserDbConf = {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		allowNull: false,
		primaryKey: true,
		autoIncrement: true,
		unique: true
	},
	nickName: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: DataTypes.STRING,
		allowNull: false
	},
	birthday: {
		type: DataTypes.DATE,
		allowNull: false
	},
	subscribedUntil: {
		type: DataTypes.DATE,
		allowNull: true
	},
	bannedUntil: {
		type: DataTypes.DATE,
		allowNull: true
	},
	nationality: {
		type: DataTypes.STRING,
		allowNull: false
	},
	deletedAt: {
		type: DataTypes.DATE,
		allowNull: true
	},
	roleId: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: Role,
			key: "id"
		}
	},
	active: {
		type: DataTypes.BOOLEAN,
		allowNull: false,
		defaultValue: true
	}
};
