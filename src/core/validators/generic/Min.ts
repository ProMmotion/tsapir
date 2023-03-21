import Validator from "../Validator";

export default class MinValidator extends Validator {
	private param: number;
	constructor(n: number) {
		super();
		this.param = n;
		this.name = "Min";
	}
	validate(e: number): boolean {
		return e >= this.param;
	}
}
