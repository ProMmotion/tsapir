import Validator from "../Validator";

export default class MinLenValidator extends Validator {
	private param: number;
	constructor(n: number) {
		super();
		this.param = n;
		this.name = "MinLen";
	}
	validate(e: Array<any> | string): boolean {
		return e.length >= this.param;
	}
}
