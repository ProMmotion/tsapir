import { MaxLenValidator } from "../MaxLen";

describe("MaxLen tests", () => {
	it("number should validate", () => {
		const v = new MaxLenValidator(10);
		expect(v.validate("0123456789")).toBeTruthy();
	});
	it("number should validate", () => {
		const v = new MaxLenValidator(10);
		expect(v.validate([])).toBeTruthy();
	});
	it("number should not validate", () => {
		const v = new MaxLenValidator(10);
		expect(v.validate("012345678910")).toBeFalsy();
	});
	it("number should not validate", () => {
		const v = new MaxLenValidator(10);
		expect(
			v.validate(["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"])
		).toBeFalsy();
	});
});
