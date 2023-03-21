import { FindOptions } from "sequelize";
import { IModelService } from "../entity/interfaces/IModelService";
import { PropertyValidator } from "./validators/PropertyValidator";

export abstract class BaseManager<T> {
	protected readonly modelService: IModelService;
	constructor(ms: IModelService) {
		this.modelService = ms;
	}
	abstract GetValidators(): { [key: string]: PropertyValidator<T> }; // key must be keyof T
	abstract Add(entity: T): Promise<T>;
	abstract Update(entity: T, fields?: (keyof T)[]): Promise<T>;
	abstract Remove(entity: T): Promise<void>;
	abstract Get(
		opts?: FindOptions<T>,
		excludes?: Extract<keyof T, string>[]
	): Promise<T[]>;
	async ValidateEntity(
		entity: T,
		fields: (keyof T)[] = Object.getOwnPropertyNames(entity) as (keyof T)[]
	): Promise<void> {
		const validators = this.GetValidators();
		for (const field of fields) {
			if (validators[field as string]) {
				await validators[field as string].check(entity);
			}
		}
		return;
	}
}
