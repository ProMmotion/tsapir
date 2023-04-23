import { FindOptions } from "sequelize";
import { IRoleRight } from "../../entities/RoleRight";
import {
	BaseManager,
	PropertyValidator,
	Validators,
	getNotMatchingValueProperties
} from "tsapir";
import Entities from "../../entities/Entities";

export class RoleRightsManager extends BaseManager<IRoleRight> {
	async Add(entity: IRoleRight): Promise<IRoleRight> {
		return new Promise<IRoleRight>((resolve, reject) => {
			this.ValidateEntity(entity)
				.then(() => {
					this.modelService.GetModel(Entities.RoleRight).create(entity)
						.then((result) => {
							resolve(<IRoleRight>result.toJSON());
						})
						.catch((e) => reject(e));
				})
				.catch((e) => reject(e));
		});
	}
	async Update(entity: IRoleRight): Promise<IRoleRight> {
		return new Promise<IRoleRight>((resolve, reject) => {
			this.modelService.GetModel(Entities.RoleRight).findOne({
				where: { id: entity.id }
			}).then((rr) => {
				if (rr != null) {
					const parsedRoleRight = <IRoleRight>rr.toJSON();
					const updatedFields = getNotMatchingValueProperties(
						entity,
						parsedRoleRight
					);
					this.ValidateEntity(entity, updatedFields)
						.then(() => {
							this.modelService.GetModel(Entities.RoleRight).update(entity, {
								where: { id: entity.id },
								returning: true
							})
								.then((result) => {
									if (result[1]) {
										resolve(
											<IRoleRight>result[1][0].toJSON()
										);
									} else {
										resolve(entity);
									}
								})
								.catch((e) => reject(e));
						})
						.catch((e) => reject(e));
				}
			});
		});
	}
	async Remove(entity: IRoleRight): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			this.modelService.GetModel(Entities.RoleRight).destroy({
				where: { id: entity.id }
			})
				.then((result) => {
					if (result === 1) resolve();
					else reject(new Error("Number of removed rows incorrect"));
				})
				.catch((e) => reject(e));
		});
	}
	async Get(
		opts?: FindOptions<IRoleRight>,
		excludes: (keyof IRoleRight)[] = []
	): Promise<IRoleRight[]> {
		return new Promise<IRoleRight[]>((resolve, reject) => {
			if (opts != undefined) {
				opts = {
					...opts,
					attributes: { ...opts.attributes, exclude: excludes }
				};
			} else {
				opts = { attributes: { exclude: excludes } };
			}
			this.modelService.GetModel(Entities.RoleRight).findAll(opts)
				.then((roles) =>
					resolve(roles.map((u) => <IRoleRight>u.toJSON()))
				)
				.catch((e) => reject(e));
		});
	}
	GetValidators(): { [key: string]: PropertyValidator<IRoleRight> } {
		return {
			roleId: new PropertyValidator("roleId", [
				Validators.notNull(),
				RoleExist(this.modelService.GetModel(Entities.Role))
			]),
			entityType: new PropertyValidator("entityType", [
				Validators.notNull(),
				EntityTypeExist()
			]),
			right: new PropertyValidator("right", [
				Validators.notNull(),
				RightExist()
			])
		};
	}
}
