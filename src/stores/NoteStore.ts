import { action, flow, observable } from 'mobx';
import { createContext } from 'react';

import { INote } from '../models';
import { noteService } from '../services';


import { DataActivityStore } from './ActivityStore';

class NoteStore extends DataActivityStore<INote> {
	
	selectId = (n: INote) => n.noteId;

	@observable dragging: boolean = false;

	constructor() {
		super();
		
		this.addNote = this.addNote.bind(this);
		this.loadNotes = this.loadNotes.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.updateNote = this.updateNote.bind(this);
		this.setDragging = this.setDragging.bind(this);
	}

	addNote = flow(function* (this: NoteStore, note?: INote) {
		this.loading = true;
		try {
			const noteId = yield noteService.add({...note, noteId: ''});
			this.addOneMutably({...note, noteId});
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});
	
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

	removeNote = flow(function* (this: NoteStore, note: INote) {
		this.loading = true;
		try {
			yield noteService.delete(note);
			this.removeOneMutably(note);
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});

	updateNote = flow(function* (this: NoteStore, note: INote) {
		this.loading = true;
		try {
			yield noteService.update(note);
			this.updateOneMutably(note);
		} catch (ex) {
			this.error = ex;
		}
		this.loading = false;
	});

	@action
	setDragging = (dragging: boolean) => {
		this.dragging = dragging;
	}
}

export default createContext(new NoteStore());
