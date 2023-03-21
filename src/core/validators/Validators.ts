import {
	IsEmailValidator,
	IsUrlValidator,
	MaxLenValidator,
	MaxValidator,
	MinLenValidator,
	MinValidator,
	NotNullValidator
} from "./generic";
import Validator from "./Validator";

// Static accessor for generic validators
export default class Validators {
	static maxLen(n: number): Validator {
		return new MaxLenValidator(n);
	}
	static max(n: number): Validator {
		return new MaxValidator(n);
	}
	static minLen(n: number): Validator {
		return new MinLenValidator(n);
	}
	static min(n: number): Validator {
		return new MinValidator(n);
	}
	static notNull(): Validator {
		return new NotNullValidator();
	}
	static isEmail(): Validator {
		return new IsEmailValidator();
	}
	static isUrl(): Validator {
		return new IsUrlValidator();
	}
}
