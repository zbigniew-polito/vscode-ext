export function getProperty<T, K extends keyof T>(obj: T, key: string): T[K] {
	if (key in obj) {
		return obj[key as K];
	}
	throw new Error(`Invalid object member "${key}"`);
}
