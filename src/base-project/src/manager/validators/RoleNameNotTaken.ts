import { Role } from "../../entities/Role";
import { Validator } from "tsapir";

export function RoleNameNotTaken(m: typeof Role): Validator {
	return new RoleNameNotTakenValidator(m);
}
class RoleNameNotTakenValidator extends Validator {
	private param: typeof Role;
	constructor(m: typeof Role) {
		super();
		this.param = m;
		this.name = "RoleNameNotTaken";
	}
	async validate(e: string): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			this.param
				.findOne({
					where: { name: e }
				})
				.then((u) => {
					if (u == null) resolve(true);
					else resolve(false);
				})
				.catch((e) => resolve(false));
		});
	}
}
