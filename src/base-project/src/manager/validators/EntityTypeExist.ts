import { getAllEntityTypes } from "../../helpers/GetEntityTypes";
import { Validator } from "tsapir";

export function EntityTypeExist(): Validator {
	return new EntityTypeExistValidator();
}
class EntityTypeExistValidator extends Validator {
	constructor() {
		super();
		this.name = "EntityType";
	}
	async validate(e: string): Promise<boolean> {
		const entityTypes = await getAllEntityTypes();
		return entityTypes.find((t) => t.model === e) != null;
	}
}
