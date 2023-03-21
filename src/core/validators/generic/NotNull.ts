import { Validator } from "../Validator";

export class NotNullValidator extends Validator {
    constructor() {
        super();
        this.name = "NotNull";
    }
    validate(e: any): boolean {
        return e != null;
    }
}