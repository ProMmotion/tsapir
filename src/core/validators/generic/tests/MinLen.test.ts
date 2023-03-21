import { MinLenValidator } from "../MinLen";

describe("MinLen tests", () => {
	it("number should validate", () => {
		const v = new MinLenValidator(10);
		expect(v.validate("0123456789")).toBeTruthy();
	});
	it("number should not validate", () => {
		const v = new MinLenValidator(10);
		expect(v.validate([])).toBeFalsy();
	});
	it("number should validate", () => {
		const v = new MinLenValidator(10);
		expect(v.validate("012345678910")).toBeTruthy();
	});
	it("number should validate", () => {
		const v = new MinLenValidator(10);
		expect(
			v.validate(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
		).toBeTruthy();
	});
});
