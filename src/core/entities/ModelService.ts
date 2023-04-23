import { Model } from "sequelize";

export type InnerModel<I extends {}> = Model<I>;
export class ModelService {
	private readonly Models: { [key: string]: InnerModel<any> };
	constructor(models: { [key: string]: InnerModel<any> }) {
		this.Models = models;
	}
	GetModel(name: string): InnerModel<any> {
		return this.Models[name];
	}
}
