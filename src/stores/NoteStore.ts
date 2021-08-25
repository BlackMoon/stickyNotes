import { action, flow, observable } from 'mobx';

import { INote, } from '../models';
import { noteService } from '../services';

import { DataActivityStore } from './ActivityStore';

export class NoteStore extends DataActivityStore<INote> {
	
	selectId = (n: INote) => n.noteId;

  @observable draggedEl: any;
  @observable offsetX: number = 0;
  @observable offsetY: number = 0;

	constructor() {
		super();

    const obj = this as { [key: string]: any };
  
    ['addNote', 'loadNotes', 'removeNote', 'updateNote', 'setDragging']
      .forEach(f => {
        const fn = obj[f].bind(this);
        obj[f] = (...args: any) => { 
          this.error = undefined; 
          return fn(...args);
        }
      }
    );
	}

	addNote = flow(function* (this: NoteStore) {
    
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
