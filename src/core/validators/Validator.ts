export abstract class Validator {
    protected name = "";
    get validatorName() {return this.name;}
    abstract validate(e: any): boolean | Promise<boolean>;
}