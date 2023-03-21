import { NotNullValidator } from "../NotNull";

describe("NotNull tests", () => {
	it("null should not validate", () => {
		const v = new NotNullValidator();
		expect(v.validate(null)).toBeFalsy();
	});
	it("null should validate", () => {
		const v = new NotNullValidator();
		expect(v.validate("test")).toBeTruthy();
	});
});
