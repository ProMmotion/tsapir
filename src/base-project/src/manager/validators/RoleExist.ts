import { Role } from "../../entities/Role";
import { Validator } from "tsapir";

export function RoleExist(m: typeof Role): Validator {
	return new RoleExistValidator(m);
}
class RoleExistValidator extends Validator {
	private param: typeof Role;
	constructor(m: typeof Role) {
		super();
		this.param = m;
		this.name = "RoleExist";
	}
	async validate(e: number): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			this.param
				.findOne({
					where: { id: e }
				})
				.then((u) => {
					if (u != null) resolve(true);
					else resolve(false);
				})
				.catch((e) => resolve(false));
		});
	}
}
