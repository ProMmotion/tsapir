import Validator from "../Validator";

export default class MaxValidator extends Validator {
	private param: number;
	constructor(n: number) {
		super();
		this.param = n;
		this.name = "Max";
	}
	validate(e: number): boolean {
		return e <= this.param;
	}
}
