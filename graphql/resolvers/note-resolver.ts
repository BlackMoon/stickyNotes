import { Query, Resolver, Mutation, Arg } from 'type-graphql';
import fs from 'fs';
import { idGenerator, Note, AddNoteInput } from "../schema";

const NOTES_FILE = 'notes.json';

@Resolver((of) => Note)
export class NoteResolver {
  
  private loaded = false;
  private notes: Note[] = [];

  @Query((returns) => [Note], { nullable: true })
  async getNotes(): Promise<Note[]> {
    if (!this.loaded) {
      this.notes = await this.loadNotes();
    }
    return this.notes;
  }

  @Mutation((returns) => String)
  async addNode(@Arg('note') note: AddNoteInput): Promise<string> {
    const noteId = idGenerator();
    const newNote = { ...note, noteId };
    this.notes.push(newNote);
    await this.saveNotes();
    return noteId;
  }

  @Mutation((returns) => Boolean)
  async deleteNode(@Arg('note') note: Note): Promise<boolean> {
    const ix = this.notes.findIndex(n => n.noteId === note.noteId);
    if (~ix) {
      this.notes.splice(ix, 1);
      await this.saveNotes();
      return true;
    } 

    return false;
  }

  @Mutation((returns) => Boolean)
  async updateNode(@Arg('note') note: Note): Promise<boolean> {
    const ix = this.notes.findIndex(n => n.noteId === note.noteId);
    if (~ix) {
      this.notes[ix] = {...this.notes[ix], ...note};
    } else {
      this.notes.push(note);
    }
  
    await this.saveNotes();
    return true;
  }

  private async loadNotes() {
    
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

  private async saveNotes() {

    const json = JSON.stringify(this.notes);
    return new Promise((resolve, reject) => {
      fs.writeFile(NOTES_FILE, json, (err) => {
        if (err) reject(err)
        else resolve(json);
      });
    })
   
  }
}