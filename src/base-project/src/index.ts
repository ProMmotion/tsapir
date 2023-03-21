import { AuthController } from "./controllers/AuthController";
import { RolePropertyRightsController } from "./controllers/RolePropertyRightsController";
import { RoleRightsController } from "./controllers/RoleRightsController";
import { UsersController } from "./controllers/UsersController";
import { InitModel } from "./init";
import { ManagerService } from "./manager/ManagerService";
import { API } from "tsapir";

const ms = new ManagerService();

new API([
	{
		route: "/api/authorize",
		controller: new AuthController(ms)
	},
	{
		route: "/api/users",
		entityType: "User",
		controller: new UsersController(ms)
	},
	{
		route: "/api/rolerights",
		entityType: "RoleRight",
		controller: new RoleRightsController(ms)
	},
	{
		route: "/api/rprs",
		entityType: "RolePropertyRight",
		controller: new RolePropertyRightsController(ms)
	}
])
	.Init(InitModel)
	.then((x) => x.Start())
	.catch((e) => console.error(e));
