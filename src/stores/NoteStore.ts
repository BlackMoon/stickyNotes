import { action, flow, observable } from 'mobx';
import { createContext } from 'react';

import { INote, } from '../models';
import { noteService } from '../services';

import { DataActivityStore } from './ActivityStore';

class NoteStore extends DataActivityStore<INote> {
	
	selectId = (n: INote) => n.noteId;

  @observable draggedEl: any;
  @observable offsetX: number = 0;
  @observable offsetY: number = 0;

	constructor() {
		super();
		
		this.addNote = this.addNote.bind(this);
		this.loadNotes = this.loadNotes.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.updateNote = this.updateNote.bind(this);

    this.setDragging = this.setDragging.bind(this);
	}

	addNote = flow(function* (this: NoteStore,) {
		this.loading = true;
		try {
			const note = yield noteService.add();
			this.addOneMutably(note);
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
			const notes: INote[] = yield noteService.getAll();
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
	setDragging = (draggedEl: any, offsetX: number = 0, offsetY: number = 0) => {
		this.draggedEl = draggedEl;
    this.offsetX = offsetX;
    this.offsetY = offsetY;
	}

}

export default createContext(new NoteStore());
