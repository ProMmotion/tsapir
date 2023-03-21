export class DateHelper {
	static GetAge(date: Date, from: Date = new Date()): number {
		const today = from;
		const bd = new Date(date);
		let age = today.getFullYear() - bd.getFullYear();
		if (today.getMonth() < bd.getMonth()) {
			age--;
		} else {
			if (
				today.getMonth() === bd.getMonth() &&
				today.getDate() < bd.getDate()
			) {
				age--;
			}
		}
		return age;
	}
	static IsSameDate(d1: Date, d2: Date): boolean {
		return (
			d1.getFullYear() === d2.getFullYear() &&
			d1.getMonth() === d2.getMonth() &&
			d1.getDate() === d2.getDate()
		);
	}
}
