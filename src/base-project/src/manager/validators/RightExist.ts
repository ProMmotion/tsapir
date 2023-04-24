import {
	canCreate,
	canDelete,
	canRead,
	canUpdate,
	Right,
	Validator
} from "tsapir";

export function RightExist(): Validator {
	return new RightExistValidator();
}
class RightExistValidator extends Validator {
	constructor() {
		super();
		this.name = "RightExist";
	}
	validate(e: number): boolean {
		return (
			e === Right.None ||
			canRead(e) ||
			canCreate(e) ||
			canUpdate(e) ||
			canDelete(e)
		);
	}
}
