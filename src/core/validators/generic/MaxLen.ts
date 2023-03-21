import Validator from "../Validator";

export default class MaxLenValidator extends Validator {
	private param: number;
	constructor(n: number) {
		super();
		this.param = n;
		this.name = "MaxLen";
	}
	validate(e: Array<any> | string): boolean {
		return e.length <= this.param;
	}
}
