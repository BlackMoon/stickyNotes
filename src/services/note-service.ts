import { idGenerator, INote } from "../models";

const DELAY_TIMEOUT = 500;

export class NoteService {
    async getAll(): Promise<INote[]> {
		
		return new Promise((resolve, reject) => {
            setTimeout(() => {              
              resolve(initialNotes);
            }, DELAY_TIMEOUT)
          });
	}
}


const initialNotes: INote[] = [
    { noteId: idGenerator(), noteText: 'note 1' },
    { noteId: idGenerator(), noteText: 'note 2' },
    { noteId: idGenerator(), noteText: 'note 3' },
];
