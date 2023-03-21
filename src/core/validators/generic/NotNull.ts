import Validator from "../Validator";

export default class NotNullValidator extends Validator {
	constructor() {
		super();
		this.name = "NotNull";
	}
	validate(e: any): boolean {
		return e != null;
	}
}
