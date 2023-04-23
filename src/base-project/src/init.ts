import { Sequelize } from "sequelize";
import { Role, RoleDbConf, RoleModelName } from "./entities/Role";
import {
	RolePropertyRight,
	RolePropertyRightDbConf,
	RolePropertyRightModelName
} from "./entities/RolePropertyRight";
import {
	RoleRight,
	RoleRightDbConf,
	RoleRightModelName
} from "./entities/RoleRight";
import { User, UserDbConf, UserModelName } from "./entities/User";

export async function InitModel(sequelize: Sequelize): Promise<void> {
	Role.init(RoleDbConf, { sequelize, modelName: RoleModelName });
	RoleRight.init(RoleRightDbConf, {
		sequelize,
		modelName: RoleRightModelName
	});
	RolePropertyRight.init(RolePropertyRightDbConf, {
		sequelize,
		modelName: RolePropertyRightModelName
	});
	User.init(UserDbConf, { sequelize, modelName: UserModelName });
	//
	await sequelize.sync({ force: true });
	console.log("Model synchronised");
	return;
}
