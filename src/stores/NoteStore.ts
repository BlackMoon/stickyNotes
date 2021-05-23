import { action, flow, observable } from 'mobx';
import { createContext } from 'react';

import { INote, } from '../models';
import { noteService } from '../services';


import { DataActivityStore } from './ActivityStore';

const NEW_NOTE_TEXT = 'new note';

class NoteStore extends DataActivityStore<INote> {
	
	selectId = (n: INote) => n.noteId;

	@observable draggedEl: any;
	@observable dragging: boolean = false;
	@observable dropped: boolean = false;

	constructor() {
		super();
		
		this.addNote = this.addNote.bind(this);
		this.loadNotes = this.loadNotes.bind(this);
		this.removeNote = this.removeNote.bind(this);
		this.updateNote = this.updateNote.bind(this);

		this.setDragging = this.setDragging.bind(this);
		this.setDropped = this.setDropped.bind(this);
	}

	addNote = flow(function* (this: NoteStore, note?: INote) {
		this.loading = true;
		try {
			const newNote = {...note, noteId: '', noteText: NEW_NOTE_TEXT};
			const noteId = yield noteService.add(newNote);
			this.addOneMutably({...newNote, noteId });
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
	setDragging = (dragging: boolean, draggedEl?: any) => {
		this.draggedEl = draggedEl;
		this.dragging = dragging;
		if (dragging) {
			this.dropped = false;
		}
	}

	@action
	setDropped = (dropped: boolean) => {
		this.dropped = dropped;
	}
}

export default createContext(new NoteStore());
