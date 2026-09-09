export function isSubset<T>(subset: T[], superset: T[]): boolean {
	return subset.every((item) => superset.includes(item))
}
