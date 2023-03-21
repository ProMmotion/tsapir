import { Validator } from "../Validator";

export class NullValidator extends Validator {
    constructor() {
        super();
        this.name = "Null";
    }
    validate(e: any): boolean {
        return e == null;
    }
}