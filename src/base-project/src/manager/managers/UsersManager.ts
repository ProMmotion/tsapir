import bcrypt from "bcrypt";
import { FindOptions } from "sequelize";
import { BaseManager, PropertyValidator, Validators } from "tsapir";
import { IUser } from "../../entities/models/User";

export class UsersManager extends BaseManager<IUser> {
	async Add(entity: IUser): Promise<IUser> {
		return new Promise<IUser>((resolve, reject) => {
			this.ValidateEntity(entity)
				.then((e) => {
					bcrypt.hash(entity.password, 10, (err, hash) => {
						entity.password = hash;
						this.modelService.UserModel.create(entity)
							.then((e) => {
								resolve(<IUser>{ ...e.toJSON(), password: "" });
							})
							.catch((e) => reject(e));
					});
				})
				.catch((e) => reject(e));
		});
	}
	async Update(
		entity: IUser,
		fields: (keyof IUser)[] = Object.getOwnPropertyNames(
			entity
		) as (keyof IUser)[]
	): Promise<IUser> {
		return new Promise<IUser>((resolve, reject) => {
			this.ValidateEntity(entity, fields)
				.then(() => {
					if (fields.includes("password")) {
						const hash = bcrypt.hashSync(entity.password, 10);
						entity.password = hash;
					}
					this.modelService.UserModel.update(entity, {
						where: { id: entity.id },
						fields: fields,
						returning: true
					})
						.then((update) => {
							if (update[1][0]) {
								resolve(<IUser>update[1][0].toJSON());
							} else {
								resolve(entity);
							}
						})
						.catch((e) => reject(e));
				})
				.catch((e) => reject(e));
		});
	}
	async Remove(entity: IUser): Promise<void> {
		return new Promise<void>((resolve, reject) => {
			entity.deletedAt = new Date(Date.now());
			this.modelService.UserModel.update(entity, {
				where: { id: entity.id }
			})
				.then(() => resolve())
				.catch((e) => reject(new Error(e)));
		});
	}
	async Get(
		opts?: FindOptions<IUser>,
		excludes: Extract<keyof IUser, string>[] = []
	): Promise<IUser[]> {
		return new Promise<IUser[]>((resolve, reject) => {
			if (opts != undefined) {
				opts = {
					...opts,
					attributes: { ...opts.attributes, exclude: excludes }
				};
			} else {
				opts = {
					attributes: { exclude: excludes }
				};
			}
			this.modelService.UserModel.findAll(opts)
				.then((users) => resolve(users.map((u) => <IUser>u.toJSON())))
				.catch((e) => reject(e));
		});
	}
	GetValidators(): { [key: string]: PropertyValidator<IUser> } {
		return {
			nickName: new PropertyValidator("nickName", [
				Validators.notNull(),
				Validators.minLen(4),
				NickNameNotTaken(this.modelService.UserModel)
			]),
			email: new PropertyValidator("email", [
				Validators.notNull(),
				Validators.isEmail(),
				EmailNotTaken(this.modelService.UserModel)
			]),
			birthday: new PropertyValidator("birthday", [
				Validators.notNull(),
				MinAge(12)
			]),
			password: new PropertyValidator("password", [
				Validators.notNull(),
				Validators.minLen(6)
			]),
			bannedUntil: new PropertyValidator("bannedUntil"),
			subscribedUntil: new PropertyValidator("subscribedUntil"),
			roleId: new PropertyValidator("roleId", [
				Validators.notNull(),
				Validators.min(1),
				RoleExist(this.modelService.RoleModel)
			]),
			nationality: new PropertyValidator("nationality", [
				Validators.notNull()
			])
		};
	}
}
