import { FindOptions } from "sequelize";
import {
	IRolePropertyRight,
	RolePropertyRight
} from "../../entities/RolePropertyRight";
import { BaseManager, PropertyValidator, Validators } from "tsapir";
import { Role } from "../../entities/Role";
import { RoleExist } from "../validators/RoleExist";
import { EntityTypeExist } from "../validators/EntityTypeExist";
import { RightExist } from "../validators/RightExist";

export class RolePropertyRightsManager extends BaseManager<IRolePropertyRight> {
	async Add(entity: IRolePropertyRight): Promise<IRolePropertyRight> {
		return new Promise<IRolePropertyRight>((resolve, reject) => {
			this.ValidateEntity(entity)
				.then(() => {
					RolePropertyRight.create(entity)
						.then((e) => resolve(<IRolePropertyRight>e.toJSON()))
						.catch((e) => reject(e));
				})
				.catch((e) => reject(e));
		});
	}
	async Update(entity: IRolePropertyRight): Promise<IRolePropertyRight> {
		return new Promise<IRolePropertyRight>((resolve, reject) => {
			this.ValidateEntity(entity)
				.then(async () => {
					const e = await RolePropertyRight.findOne({
						where: { id: entity.id }
					});
					if (e != null) {
						RolePropertyRight.update(entity, {
							where: { id: entity.id },
							returning: true
						})
							.then((update) =>
								resolve(
									<IRolePropertyRight>update[1][0].toJSON()
								)
							)
							.catch((e) => reject(e));
					} else {
						reject(new Error("Entity not found"));
					}
				})
				.catch((e) => reject(e));
		});
	}
	async Remove(entity: IRolePropertyRight): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			RolePropertyRight.destroy({
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
		opts?: FindOptions<IRolePropertyRight>,
		excludes: (keyof IRolePropertyRight)[] = []
	): Promise<IRolePropertyRight[]> {
		return new Promise<IRolePropertyRight[]>((resolve, reject) => {
			if (opts != undefined) {
				opts = {
					...opts,
					attributes: { ...opts.attributes, exclude: excludes }
				};
			} else {
				opts = { attributes: { exclude: excludes } };
			}
			RolePropertyRight.findAll(opts)
				.then((roles) =>
					resolve(roles.map((u) => <IRolePropertyRight>u.toJSON()))
				)
				.catch((e) => reject(e));
		});
	}
	GetValidators(): { [key: string]: PropertyValidator<IRolePropertyRight> } {
		return {
			roleId: new PropertyValidator("roleId", [
				Validators.notNull(),
				RoleExist(Role)
			]),
			entityType: new PropertyValidator("entityType", [
				Validators.notNull(),
				EntityTypeExist()
			]),
			property: new PropertyValidator("property", [Validators.notNull()]),
			right: new PropertyValidator("right", [
				Validators.notNull(),
				RightExist()
			])
		};
	}
}
