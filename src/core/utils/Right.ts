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
