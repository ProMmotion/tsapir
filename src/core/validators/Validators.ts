import { IsEmailValidator } from "./generic/IsEmail";
import { IsUrlValidator } from "./generic/IsUrl";
import { MaxValidator } from "./generic/Max";
import { MaxLenValidator } from "./generic/MaxLen";
import { MinValidator } from "./generic/Min";
import { MinLenValidator } from "./generic/MinLen";
import { NotNullValidator } from "./generic/NotNull";
import { Validator } from "./Validator";

// Static accessor for generic validators
export class Validators {
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
