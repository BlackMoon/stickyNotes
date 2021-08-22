import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import AddNoteBar from "../AddNoteBar";
import NoteList from "../NoteList";

describe('AddNote', () => {

  test('renders without crashing', () => {
    render(<AddNoteBar />);
  })

  test('Add new note', async () => {
    
    render(<AddNoteBar />);
    const buttonEl = screen.getByText(/Add Note/i);
    fireEvent.click(buttonEl);
    
    const container = render(<NoteList />);

    await waitFor(async () => {
      const noteEl = container.getByText(/new note/i)
      expect(noteEl).toBeTruthy();
    })
    
  })
});