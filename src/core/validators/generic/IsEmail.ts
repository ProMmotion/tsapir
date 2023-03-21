import { IsEmail } from "../../utils/utils";
import Validator from "../Validator";

export default class IsEmailValidator extends Validator {
	constructor() {
		super();
		this.name = "IsEmail";
	}
	validate(e: string): boolean {
		return IsEmail(e);
	}
}
