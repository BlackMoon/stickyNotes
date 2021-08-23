import axios from "axios";
import { INote } from "../models";

const ENDPOINT = 'http://localhost:8000/graphql';

export class NoteService {

  async add(): Promise<string> {
    const NOTE_MUTATION = `
      mutation 
        AddNote {
          addNote {
            noteId, noteText, x, y, z
          }
        }`;

    const data = await axios.post(
      ENDPOINT, 
      { query: NOTE_MUTATION },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then(resp => resp.data);

   return data.data.addNote;
  }

  async delete(note: INote): Promise<void> {
    const NOTE_MUTATION = `
      mutation 
        DeleteNote($note: NoteInput!) {
          deleteNode(note: $note)
        }`;

    await axios.post(
      ENDPOINT, 
      { query: NOTE_MUTATION, variables: { note } },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then(resp => resp.data);
  }

  async getAll(): Promise<INote[]> {

    const NOTES_QUERY = `
      query {
        notes {
          noteId
          noteText
          x
          y
          z
        }
      }`;

    const data = await axios.post(
      ENDPOINT, 
      { query: NOTES_QUERY },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then(resp => resp.data);

    return data.data.notes as INote[];
	}

  async update(note: INote): Promise<void> {
    const NOTE_MUTATION = `
      mutation 
        UpdateNote($note: NoteInput!) {
          updateNode(note: $note)
        }`;

    await axios.post(
      ENDPOINT, 
      { query: NOTE_MUTATION, variables: { note } },
      { headers: { 'Content-Type': 'application/json' } },
    )
    .then(resp => resp.data);
  }
}






