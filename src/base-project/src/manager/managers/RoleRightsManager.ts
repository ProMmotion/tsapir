import { FindOptions } from "sequelize/types";
import { IRoleRight } from "../../entities/models/RoleRight";
import { getNotMatchingValueProperties } from "../../../core/utils/utils";
import { BaseManager } from "../BaseManager";
import { PropertyValidator } from "../validators/PropertyValidator";
import { Validators } from "../validators/Validators";

export class RoleRightsManager extends BaseManager<IRoleRight> {
	async Add(entity: IRoleRight): Promise<IRoleRight> {
		return new Promise<IRoleRight>((resolve, reject) => {
			this.ValidateEntity(entity)
				.then(() => {
					this.modelService.RoleRightModel.create(entity)
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
			this.modelService.RoleRightModel.findOne({
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
							this.modelService.RoleRightModel.update(entity, {
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
			this.modelService.RoleRightModel.destroy({
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
			this.modelService.RoleRightModel.findAll(opts)
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
				RoleExist(this.modelService.RoleModel)
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
