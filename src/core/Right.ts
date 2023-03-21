// Rights must be :
// 0 -> No rights
// 1 -> Create
// 2 -> Read
// 3 -> Create/Read
// 4 -> Update
// 5 -> Create/Update
// 6 -> Read/Update
// 7 -> Create/Read/Update
// 8 -> Delete
// 9 -> Create/Delete
// 10 -> Read/Delete
// 11 -> Create/Read/Delete
// 12 -> Update/Delete
// 13 -> Create/Update/Delete
// 14 -> Read/Update/Delete
// 15 -> Create/Read/Update/Delete

export enum Right {
	None,
	Create,
	Read,
	Update = 4,
	Delete = 8,
	All = 15
}

export function canCreate(r: number): boolean {
	const creates = [
		Right.Create,
		Right.Create + Right.Read,
		Right.Create + Right.Update,
		Right.Create + Right.Delete,
		Right.Create + Right.Read + Right.Update,
		Right.Create + Right.Read + Right.Delete,
		Right.Create + Right.Update + Right.Delete,
		Right.Create + Right.Read + Right.Update + Right.Delete
	];
	return creates.find((c) => c === r) != null;
}
export function canRead(r: number): boolean {
	const reads = [
		Right.Read,
		Right.Read + Right.Create,
		Right.Read + Right.Update,
		Right.Read + Right.Delete,
		Right.Read + Right.Create + Right.Update,
		Right.Read + Right.Create + Right.Delete,
		Right.Read + Right.Update + Right.Delete,
		Right.Read + Right.Create + Right.Update + Right.Delete
	];
	return reads.find((read) => read === r) != null;
}
export function canUpdate(r: number): boolean {
	const updates = [
		Right.Update,
		Right.Update + Right.Read,
		Right.Update + Right.Create,
		Right.Update + Right.Delete,
		Right.Update + Right.Read + Right.Create,
		Right.Update + Right.Read + Right.Delete,
		Right.Update + Right.Create + Right.Delete,
		Right.Update + Right.Read + Right.Create + Right.Delete
	];
	return updates.find((u) => u === r) != null;
}
export function canDelete(r: number): boolean {
	const deletes = [
		Right.Delete,
		Right.Delete + Right.Read,
		Right.Delete + Right.Create,
		Right.Delete + Right.Update,
		Right.Delete + Right.Read + Right.Create,
		Right.Delete + Right.Read + Right.Update,
		Right.Delete + Right.Create + Right.Update,
		Right.Delete + Right.Read + Right.Create + Right.Update
	];
	return deletes.find((d) => d === r) != null;
}
