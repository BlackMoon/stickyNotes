import fs from 'fs';
import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import { idGenerator, Note } from "../schema";

const NEW_NOTE_TEXT = 'new note';
const NEW_NOTE_X = 200;
const NEW_NOTE_Y = 200;
const NEW_NOTE_Z = 20;

const NOTES_FILE = 'notes.json';

@Resolver((of) => Note)
export class NoteResolver {

  private loaded = false;
  private internalNotes: Note[] = [];

  @Query((returns) => [Note], { nullable: true })
  async notes(): Promise<Note[]> {
    if (!this.loaded){
      this.internalNotes = await this.loadNotes();
      this.loaded = true;
    }
    return this.internalNotes;
  }

  @Mutation((returns) => Note)
  async addNote(): Promise<Note> {
    const noteId = idGenerator();
    const note = { noteId, x: NEW_NOTE_X, y: NEW_NOTE_Y, z: NEW_NOTE_Z, noteText: NEW_NOTE_TEXT};
    const notes = await this.notes(); 
    notes.push(note);
    await this.saveNotes(notes);
    return note;
  }

  @Mutation((returns) => Boolean)
  async deleteNode(@Arg('note') note: Note): Promise<boolean> {
    const notes = await this.notes(); 
    const ix = notes.findIndex((n: Note) => n.noteId === note.noteId);
    if (~ix) {
      notes.splice(ix, 1);
      await this.saveNotes(notes);
      return true;
    } 

    return false;
  }

  @Mutation((returns) => Boolean)
  async updateNode(@Arg('note') note: Note): Promise<boolean> {
    
    const notes = await this.notes(); 
    const ix = notes.findIndex((n: Note) => n.noteId === note.noteId); 
    if (~ix) {
      notes[ix] = {...notes[ix], ...note};
    } else {
      notes.push(note);
    }
    
    await this.saveNotes(notes);
    return true;
  }

  private loadNotes = async (): Promise<Note[]> => {
    
    if (fs.existsSync(NOTES_FILE)) {
      return new Promise((resolve, reject) => {
        fs.readFile(NOTES_FILE, (err, data) => {
          if (err) reject(err)
          else resolve(data)
        })
      })
      .then(rawdata => JSON.parse(rawdata as string));
    }

    return [];
  }

  private saveNotes = async (notes: Note[]) => {

    const json = JSON.stringify(notes, null, 2);
   
    return new Promise((resolve, reject) => {
      fs.writeFile(NOTES_FILE, json, (err) => {
        if (err) reject(err)
        else resolve(json);
      });
    })
  }

  
}