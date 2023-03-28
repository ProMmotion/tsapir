import { DateHelper } from "../helpers/DateHelper";
import APIControllerMethod from "../APIControllerMethod";

export function IsEmail(email: string): boolean {
	const reg: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
	if (email === null || email.match(reg) == null) {
		return false;
	}
	return true;
}
export function parseRouteParam(
	completeRoute: string,
	subRoute: string
): { [key: string]: string } {
	const parsedRoute: string[] = completeRoute
		.split("/")
		.filter((s) => s !== "");
	const parsedSubRoute: string[] = subRoute
		.split("/")
		.filter((s) => s !== "");
	const params: { [key: string]: string } = {};
	if (
		parsedRoute.length > 0 &&
		parsedRoute.length === parsedSubRoute.length
	) {
		for (let i = 0; i < parsedRoute.length; i++) {
			if (parsedSubRoute[i].startsWith(":")) {
				params[parsedSubRoute[i].split(":")[1]] = parsedRoute[i];
			}
		}
	}
	return params;
}
export function findMatchingRoute(
	route: string,
	subRoutes: APIControllerMethod[]
): APIControllerMethod | undefined {
	return subRoutes.find((sub) => {
		const sub1Elements = route.split("/").filter((s) => s !== "");
		const sub2Elements = sub.route.split("/").filter((s) => s !== "");
		if (sub1Elements.length !== sub2Elements.length) {
			return false;
		}
		for (let i = 0; i < sub1Elements.length; i++) {
			if (
				!sub2Elements[i].startsWith(":") &&
				sub2Elements[i] !== sub1Elements[i]
			) {
				return false;
			}
		}
		return true;
	});
}
export function getNotMatchingValueProperties<T>(
	obj1: T,
	obj2: T
): (keyof T)[] {
	if (obj1 == null || obj2 == null)
		throw new Error("One of the parameter is not defined");
	const properties: (keyof T)[] = [];
	const entries1: [string, any][] = Object.entries(obj1); // [[key, value], ...]
	const entries2 = Object.entries(obj2); // [[key, value], ...]
	if (entries1.length != entries2.length)
		throw new Error("Object doesn't implement the same properties");
	for (let i = 0; i < entries1.length; i++) {
		const match = entries2.find((entry) => entry[0] === entries1[i][0]);
		if (match != null) {
			if (match[1] instanceof Date && entries1[i][1] instanceof Date) {
				if (!DateHelper.IsSameDate(match[1], entries1[i][1])) {
					properties.push(match[0] as keyof T);
				}
			} else {
				if (match[1] !== entries1[i][1]) {
					properties.push(match[0] as keyof T);
				}
			}
		} else {
			throw new Error("Object doesn't implement the same properties");
		}
	}
	return properties;
}
