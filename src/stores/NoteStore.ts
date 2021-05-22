import { flow } from 'mobx';
import { createContext } from 'react';

import { INote } from '../models';
import { noteService } from '../services';


import { DataActivityStore } from './ActivityStore';

class NoteStore extends DataActivityStore<INote> {
	
	selectId = (n: INote) => n.noteId;

	constructor() {
		super();
		
		this.loadNotes = this.loadNotes.bind(this);
	}
	
	loadNotes = flow(function* (this: NoteStore) {
		if (this.dataLoaded) {
			return;
		}

		this.loading = true;

		try {
			const notes = yield noteService.getAll();			
			this.setManyMutably(notes);
			this.dataLoaded = true;	
		} catch (ex) {
			this.error = ex;
		}

		this.loading = false;
	});
}

export default createContext(new NoteStore());
