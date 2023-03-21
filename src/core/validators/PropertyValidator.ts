import Validator from "./Validator";

export default class PropertyValidator<T> {
	public readonly propertyValidatorName;
	private readonly validators;
	constructor(name: keyof T, validators: Validator[] = []) {
		this.propertyValidatorName = name;
		this.validators = validators;
	}
	async check(entity: T): Promise<void> {
		if (this.validators.length === 0) return;
		for (const v of this.validators) {
			if (!(await v.validate(entity[this.propertyValidatorName]))) {
				throw new Error(
					`Validator ${v.validatorName} failed for ${
						this.propertyValidatorName as string
					}`
				);
			}
		}
	}
}
