import { IsEmailValidator } from "../IsEmail";

describe("isEmail test", () => {
	it("email should validate", () => {
		const v = new IsEmailValidator();
		expect(v.validate("test@test.com")).toBeTruthy();
	});
	it("email should validate", () => {
		const v = new IsEmailValidator();
		expect(v.validate("test@test.co.com")).toBeTruthy();
	});
	it("email should not validate", () => {
		const v = new IsEmailValidator();
		expect(v.validate("test.test.com")).toBeFalsy();
	});
	it("email should not validate", () => {
		const v = new IsEmailValidator();
		expect(v.validate("testtest.com")).toBeFalsy();
	});
	it("email should not validate", () => {
		const v = new IsEmailValidator();
		expect(v.validate("testtestcom")).toBeFalsy();
	});
	it("email should not validate", () => {
		const v = new IsEmailValidator();
		expect(v.validate("test.test@com")).toBeFalsy();
	});
});
