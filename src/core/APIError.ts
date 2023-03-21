import { HttpStatusCodes } from "./enums/HttpStatusCodes";

export class APIError extends Error {
	public errorStatus: HttpStatusCodes;
	constructor(errorStatus: HttpStatusCodes, message: string) {
		super(message);
		this.errorStatus = errorStatus;
	}
}
