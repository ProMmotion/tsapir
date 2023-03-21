import { IsUrlValidator } from "../IsUrl";

describe("isUrl test", () => {
	it("url should validate", () => {
		const v = new IsUrlValidator();
		expect(v.validate("112.25.75.200")).toBeTruthy();
	});
	it("url should not validate", () => {
		const v = new IsUrlValidator();
		expect(v.validate("test.test@com")).toBeFalsy();
	});
	it("url should not validate", () => {
		const v = new IsUrlValidator();
		expect(v.validate("testtest")).toBeFalsy();
	});
	it("url should not validate", () => {
		const v = new IsUrlValidator();
		expect(v.validate("..test")).toBeFalsy();
	});
	it("url should not validate", () => {
		const v = new IsUrlValidator();
		expect(v.validate("-225.-36.25.2")).toBeFalsy();
	});
});
