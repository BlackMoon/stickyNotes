import { idGenerator, INote } from "../models";

const DELAY_TIMEOUT = 500;
const NOTES_KEY = 'notes'

const initialNotes: INote[] = [
  { noteId: idGenerator(), noteText: 'note 1', x: 100, y: 100 },
  { noteId: idGenerator(), noteText: 'note 2', x: 340, y : 100},
  { noteId: idGenerator(), noteText: 'note 3', x: 100, y: 340 },
];

/**API emulator */
export class NoteService {

  async add(note: INote): Promise<string> {
    return new Promise((resolve, reject) => {

      setTimeout(() => {  
        const noteId = idGenerator(); 
        const notes = this.loadNotesFromStore() ?? [];
        notes.push({ ...note, noteId });
        this.saveNotesToStore(notes);
        resolve(noteId);
      }, DELAY_TIMEOUT)

    });
  }

  async delete(note: INote): Promise<void> {
    return new Promise((resolve, reject) => {

      setTimeout(() => {   
        const notes = this.loadNotesFromStore() ?? [];
        const ix = notes.findIndex(n => n.noteId === note.noteId);
        if (~ix) {
          notes.splice(ix, 1);
        }
        this.saveNotesToStore(notes);
        resolve();
      }, DELAY_TIMEOUT)

    });
  }

  async getAll(): Promise<INote[]> {

    return new Promise((resolve, reject) => {

      setTimeout(() => {   
        let notes = this.loadNotesFromStore();

        if (!notes) {
          notes = initialNotes;
          this.saveNotesToStore(notes);
        }
        
        resolve(notes);
      }, DELAY_TIMEOUT)

    });
	}

  async update(note: INote): Promise<void> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const notes = this.loadNotesFromStore() ?? [];
        const ix = notes.findIndex(n => n.noteId === note.noteId);
        if (~ix) {
          notes[ix] = {...notes[ix], ...note};
        } else {
          notes.push(note);
        }
        this.saveNotesToStore(notes);
        resolve();
      }, DELAY_TIMEOUT);
    });
  }

  loadNotesFromStore = (): INote[] => {
    const notes = window.localStorage?.getItem(NOTES_KEY);
    return notes && JSON.parse(notes);
  }

  saveNotesToStore = (notes: INote[]): void => {
    window.localStorage?.setItem(NOTES_KEY, JSON.stringify(notes));
  }
}






