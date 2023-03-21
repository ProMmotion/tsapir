import { NullValidator } from "../Null";

describe("Null tests", () => {
	it("null should validate", () => {
		const v = new NullValidator();
		expect(v.validate(null)).toBeTruthy();
	});
	it("null should not validate", () => {
		const v = new NullValidator();
		expect(v.validate("test")).toBeFalsy();
	});
});
