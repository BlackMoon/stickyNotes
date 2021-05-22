export type Comparer<T> = (a: T, b: T) => number;
export type IdSelectorStr<T> = (model: T) => string;
export type IdSelectorNum<T> = (model: T) => number;
export type IdSelector<T> = IdSelectorStr<T> | IdSelectorNum<T>;

export interface DictionaryNum<T> {
	[id: number]: T | undefined;
}

export abstract class Dictionary<T> implements DictionaryNum<T> {
	[id: string]: T | undefined;
}

export function selectIdValue<T>(entity: T, selectId: IdSelector<T>) {
	const key = selectId(entity);

	if (key === undefined) {
		console.warn(
			'The entity passed to the `selectId` implementation returned undefined.',
			'You should probably provide your own `selectId` implementation.',
			'The entity that was passed:',
			entity,
			'The `selectId` implementation:',
			selectId.toString()
		);
	}

	return key;
}
