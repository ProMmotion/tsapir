import { IsValidServerAddress } from "../../utils/utils";
import { Validator } from "../Validator";

export class IsUrlValidator extends Validator {
	constructor() {
		super();
		this.name = "IsUrl";
	}
	validate(e: string): boolean {
		return IsValidServerAddress(e);
	}
}
