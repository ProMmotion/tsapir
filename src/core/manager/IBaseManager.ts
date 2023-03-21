import { FindOptions } from "sequelize";
import PropertyValidator from "../validators/PropertyValidator";
import IModelService from "../entities/IModelService";

export default interface IBaseManager<T> {
	readonly modelService: IModelService;
	GetValidators(): { [key: string]: PropertyValidator<T> }; // key must be keyof T
	Add(entity: T): Promise<T>;
	Update(entity: T, fields?: (keyof T)[]): Promise<T>;
	Remove(entity: T): Promise<void>;
	Get(
		opts?: FindOptions<T>,
		excludes?: Extract<keyof T, string>[]
	): Promise<T[]>;
	ValidateEntity(entity: T, fields: (keyof T)[]): Promise<void>;
}
