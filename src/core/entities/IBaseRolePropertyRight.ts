import { Right } from "../Right";

export default interface IBaseRolePropertyRight {
	id: string;
	roleId: string;
	right: Right;
	entityType: string;
	property: string;
}
