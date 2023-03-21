import { DateHelper } from "./DateHelper";

describe("DateHelper", () => {
	it("age should be 22", () => {
		const d = new Date(2000, 7, 2);
		expect(DateHelper.GetAge(d, new Date(2022, 7, 3))).toBe(22);
	});
	it("age should be 22", () => {
		const d = new Date(2000, 7, 3);
		expect(DateHelper.GetAge(d, new Date(2022, 7, 3))).toBe(22);
	});
	it("age should not be 22", () => {
		const d = new Date(2000, 7, 4);
		expect(DateHelper.GetAge(d, new Date(2022, 7, 3))).not.toBe(22);
		expect(DateHelper.GetAge(d, new Date(2022, 7, 3))).toBe(21);
	});
	it("dates are the same", () => {
		const d1 = new Date(2000, 7, 4);
		const d2 = new Date(2000, 7, 4);
		expect(DateHelper.IsSameDate(d1, d2)).toBeTruthy();
	});
	it("dates are not the same", () => {
		const d1 = new Date(2000, 7, 4);
		const d2 = new Date(2000, 7, 5);
		expect(DateHelper.IsSameDate(d1, d2)).toBeFalsy();
	});
});
