import { User } from "../../entities/User";
import { Validator } from "tsapir";

export function EmailNotTaken(m: typeof User): Validator {
	return new EmailNotTakenValidator(m);
}
class EmailNotTakenValidator extends Validator {
	private param: typeof User;
	constructor(m: typeof User) {
		super();
		this.param = m;
		this.name = "EmailNotTaken";
	}
	async validate(e: string): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			this.param
				.findOne({
					where: { email: e }
				})
				.then((u) => {
					if (u != null) resolve(false);
					else resolve(true);
				})
				.catch((e) => resolve(false));
		});
	}
}
