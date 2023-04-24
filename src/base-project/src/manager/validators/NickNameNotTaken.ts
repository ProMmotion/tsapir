import { User } from "../../entities/User";
import { Validator } from "tsapir";

export function NickNameNotTaken(m: typeof User): Validator {
	return new NickNameNotTakenValidator(m);
}
class NickNameNotTakenValidator extends Validator {
	private param: typeof User;
	constructor(m: typeof User) {
		super();
		this.param = m;
		this.name = "NicknameNotTaken";
	}
	async validate(e: string): Promise<boolean> {
		return new Promise<boolean>((resolve) => {
			this.param
				.findOne({
					where: { nickName: e }
				})
				.then((u) => {
					if (u != null) resolve(false);
					else resolve(true);
				})
				.catch((e) => resolve(false));
		});
	}
}
