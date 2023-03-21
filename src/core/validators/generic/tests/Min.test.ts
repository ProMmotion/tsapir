import { MinValidator } from "../Min";

describe("Max tests", () => {
	it("number should not validate", () => {
		const v = new MinValidator(10);
		expect(v.validate(8)).toBeFalsy();
	});
	it("number should validate", () => {
		const v = new MinValidator(10);
		expect(v.validate(10)).toBeTruthy();
	});
	it("number should validate", () => {
		const v = new MinValidator(10);
		expect(v.validate(11)).toBeTruthy();
	});
});
