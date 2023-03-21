const ODATAPARSER = require("odata-parser");
import { FindOptions, WhereOptions, Order, OrderItem, Op } from "sequelize";

interface FilterLeft {
	type: "property";
	name: string;
}
interface FilterRight {
	type: "literal";
	value: any;
}
interface Filter {
	type: "eq" | "ne" | "gt" | "ge" | "lt" | "le" | "in" | "and" | "or";
	left: FilterLeft | Filter | FilterFunction;
	right: FilterRight | Filter | FilterFunction;
}
interface FilterFunction {
	type: "functioncall";
	func: "startswith" | "endswith";
	args: (FilterLeft | FilterRight)[];
}
const SequelizeOp = {
	eq: Op.eq,
	ne: Op.ne,
	gt: Op.gt,
	ge: Op.gte,
	lt: Op.lt,
	le: Op.lte,
	in: Op.in,
	and: Op.and,
	or: Op.or
};
const SequelizeFunc = {
	startswith: Op.startsWith,
	endswith: Op.endsWith
};

export class ODataParser {
	static Parse<T>(query: string | undefined): FindOptions<T> | undefined {
		if (query == undefined || query == "") {
			return undefined;
		}
		const ODataQueryOptions = query.split("&");
		const skip = ODataQueryOptions.find(
			(option) => option.split("=")[0] == "$skip"
		);
		return {
			where: this.parseFilter(
				ODataQueryOptions.find(
					(option) => option.split("=")[0] == "$filter"
				)
			),
			limit: this.parseTop(
				ODataQueryOptions.find(
					(option) => option.split("=")[0] == "$top"
				)
			),
			attributes: this.parseSelect(
				ODataQueryOptions.find(
					(option) => option.split("=")[0] == "$select"
				)
			),
			order: this.parseOrder(
				ODataQueryOptions.find(
					(option) => option.split("=")[0] == "$orderby"
				)
			)
		};
	}
	private static parseFilterToSequelize(
		filter: Filter | FilterFunction
	): any | undefined {
		if (filter.type != "functioncall") {
			if (filter.type != "or" && filter.type != "and") {
				const left = <FilterLeft>filter.left;
				const right = <FilterRight>filter.right;
				return {
					[left.name]: {
						[SequelizeOp[filter.type]]: right.value
					}
				};
			} else {
				return {
					[SequelizeOp[filter.type]]: [
						this.parseFilterToSequelize(
							<Filter | FilterFunction>filter.left
						),
						this.parseFilterToSequelize(
							<Filter | FilterFunction>filter.right
						)
					]
				};
			}
		} else {
			const prop = <FilterLeft>(
				filter.args.find((arg) => arg.type == "property")
			);
			const value = <FilterRight>(
				filter.args.find((arg) => arg.type == "literal")
			);
			if (prop != undefined && value != undefined) {
				return {
					[prop.name]: {
						[SequelizeFunc[filter.func]]: value.value
					}
				};
			} else {
				return undefined;
			}
		}
	}

	private static parseFilter<T>(
		filter: string | undefined
	): WhereOptions<T> | undefined {
		if (filter == undefined) {
			return filter;
		}
		return <WhereOptions<T>>(
			this.parseFilterToSequelize(ODATAPARSER.parse(filter).$filter)
		);
	}
	private static parseTop(top: string | undefined): number | undefined {
		if (top == undefined) {
			return top;
		}
		return parseInt(top.split("=")[1]);
	}
	private static parseSelect(
		select: string | undefined
	): string[] | undefined {
		if (select == undefined) {
			return select;
		}
		return select.split("=")[1].split(",");
	}
	private static parseOrder(order: string | undefined): Order | undefined {
		if (order == undefined) {
			return order;
		}
		return order
			.split("=")[1]
			.split(",")
			.map((o) => <OrderItem>o.split(" "));
	}
}
