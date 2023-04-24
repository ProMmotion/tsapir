import { DateHelper } from "../../helpers/DateHelper";
import { Validator } from "tsapir";

export function MinAge(n: number): Validator {
	return new MinAgeValidator(n);
}
class MinAgeValidator extends Validator {
	private param: number;
	constructor(m: number) {
		super();
		this.param = m;
		this.name = "MinAge";
	}
	validate(e: Date): boolean {
		return DateHelper.GetAge(e) >= this.param;
	}
}
