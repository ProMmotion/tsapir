import { FindOptions } from "sequelize";
import { IRole } from "../../entities/Role";
import {
	BaseManager,
	PropertyValidator,
	Validators,
	getNotMatchingValueProperties
} from "tsapir";
import Entities from "../../entities/Entities";

export class RolesManager extends BaseManager<IRole> {
	async Add(entity: IRole): Promise<IRole> {
		return new Promise<IRole>((resolve, reject) => {
			this.ValidateEntity(entity)
				.then(() => {
					this.modelService.GetModel(Entities.Role).create(entity)
						.then((result) => {
							resolve(<IRole>result.toJSON());
						})
						.catch((e) => reject(e));
				})
				.catch((e) => reject(e));
		});
	}
	async Update(entity: IRole): Promise<IRole> {
		return new Promise<IRole>((resolve, reject) => {
			this.modelService.GetModel(Entities.Role).findOne({
				where: { id: entity.id }
			})
				.then((r) => {
					if (r != null) {
						const parsedRole = <IRole>r.toJSON();
						const updatedFields: (keyof IRole)[] =
							getNotMatchingValueProperties(entity, parsedRole);
						this.ValidateEntity(entity, updatedFields)
							.then(() => {
								this.modelService.GetModel(Entities.Role).update(entity, {
									where: { id: entity.id },
									returning: true
								})
									.then((update) => {
										if (update[1]) {
											resolve(
												<IRole>update[1][0].toJSON()
											);
										} else {
											resolve(entity);
										}
									})
									.catch((e) => reject(e));
							})
							.catch((e) => reject(e));
					}
				})
				.catch((e) => reject(e));
		});
	}
	async Remove(entity: IRole): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.modelService.GetModel(Entities.Role).destroy({ where: { id: entity.id } })
				.then((result) => {
					if (result === 1) resolve();
					else reject(new Error("Number of removed rows incorrect"));
				})
				.catch((e) => reject(e));
		});
	}
	async Get(
		opts?: FindOptions<IRole>,
		excludes: (keyof IRole)[] = []
	): Promise<IRole[]> {
		return new Promise<IRole[]>((resolve, reject) => {
			if (opts != undefined) {
				opts = {
					...opts,
					attributes: { ...opts.attributes, exclude: excludes }
				};
			} else {
				opts = { attributes: { exclude: excludes } };
			}
			this.modelService.GetModel(Entities.Role).findAll(opts)
				.then((roles) => resolve(roles.map((u) => <IRole>u.toJSON())))
				.catch((e) => reject(e));
		});
	}
	GetValidators(): { [key: string]: PropertyValidator<IRole> } {
		return {
			name: new PropertyValidator("name", [
				Validators.notNull(),
				Validators.minLen(3),
				RoleNameNotTaken(this.modelService.GetModel(Entities.Role))
			])
		};
	}
}
