import { action, computed, observable, reaction } from 'mobx';
import { Comparer, Dictionary, IdSelector, selectIdValue } from '../shared';

export interface EntityState<T> {
	ids: (string | number)[];
	entities: Dictionary<T>;
	sortComparer?: false | Comparer<T>;
}

export abstract class ActivityStore {
	@observable error?: Error;
	@observable loading: boolean = false;
}

export abstract class DataActivityStore<T> extends ActivityStore implements EntityState<T> {
	abstract selectId: IdSelector<T>;
	protected dataLoaded: boolean = false;

	sortComparer?: false | Comparer<T>;

	@observable ids: (string | number)[] = [];
	@observable entities: Dictionary<T> = {};

	constructor() {
		super();
		reaction(
			() => this.loading,
			_ => console.log(this.loading)
		  );
	}

	@computed get allEntities() {
		const allEntities = this.ids.map(id => this.entities[id]) as T[];
		return this.sortComparer ? allEntities.sort(this.sortComparer) : allEntities;
	}

	@computed get total() {
		return this.ids.length;
	}	
	
	@action
	protected addOneMutably(entity: T) {
		const key = selectIdValue(entity, this.selectId);

		if (key in this.entities) {
			return;
		}

		this.ids.push(key);
		this.entities[key] = entity;
	}
	
	@action
	protected setManyMutably(entities: T[]) {
		this.ids = [];
		this.entities = {};
		for (const entity of entities) {
			this.addOneMutably(entity);
		}
	}
	
	protected updateOneMutably(updated: T) {
		const key = selectIdValue(updated, this.selectId);
		this.entities[key] = updated;
	}
}
