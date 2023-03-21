import { Right } from "../Right";

export default interface IBaseRoleRight {
	id: string;
	roleId: string;
	right: Right;
	entityType: string;
}
