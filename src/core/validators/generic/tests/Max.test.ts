import { MaxValidator } from "../Max";

describe("Max tests", () => {
	it("number should validate", () => {
		const v = new MaxValidator(10);
		expect(v.validate(8)).toBeTruthy();
	});
	it("number should validate", () => {
		const v = new MaxValidator(10);
		expect(v.validate(10)).toBeTruthy();
	});
	it("number should not validate", () => {
		const v = new MaxValidator(10);
		expect(v.validate(11)).toBeFalsy();
	});
});
