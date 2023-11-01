import { Validator, ClassType } from "tsapir";

export function IsKeyOf<T>(n: ClassType<T>): Validator {
	return new IsKeyOfValidator(n);
}
class IsKeyOfValidator<T> extends Validator {
	private param: ClassType<T>;
	constructor(m: ClassType<T>) {
		super();
		this.param = m;
		this.name = "IsKeyOf";
	}
	validate(e: string): boolean {
		return Object.getOwnPropertyNames(new this.param()).includes(e);
	}
}
