import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";

import * as Services from "../../services";
import { server } from "../../services";

import AddNoteBar from "../AddNoteBar";
import NoteList from "../NoteList";

jest.mock('../../services/config', () => ({ ENDPOINT: 'http://localhost/graphql' }));


jest.mock('../../services', () => ({ noteService: { getAll: jest.fn().mockReturnValue(notes) } }));

describe('AddNoteBar', () => {
  
  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  beforeAll(() => server.listen())

  test('load notes API', async () => {

    render(<AddNoteBar/>);
  
    expect(Services.noteService.getAll).toHaveBeenCalledTimes(1);
    
   
    //const notelist = render(<NoteList/>);
    // const noteEls = notelist.container.querySelectorAll('div.note-item');
    // expect(noteEls.length).toEqual(2);
    const { getByTestId } = render(<NoteList/>);

    await waitFor (async () => {
      console.log(getByTestId('fakeId1'));
      // console.log(notelist.container.children);
      // const noteEls = notelist.container.querySelectorAll('div.note-item');
      // console.log(noteEls);
    //   // expect(noteEls.length).toEqual(2);
    //   // expect(spyGetAll).toBeCalled();
    })

   

  })

  xtest('Add new note', async () => {
    
    const { container, getByText } = render(<AddNoteBar/>);
    
    expect(container.children.length).toBeGreaterThan(0);
    
    const buttonEl = getByText(/Add Note/i);
    expect(buttonEl).toBeTruthy();

    fireEvent.click(buttonEl);

    await waitFor(async () => {
      const noteEl = getByText(/Processing/i);
      expect(noteEl).toBeTruthy();
    })
    
    // const container = render(<NoteList />);

    // await waitFor(async () => {
    //   const noteEl = container.getByText(/new note/i)
    //   expect(noteEl).toBeTruthy();
    // })
    
  })
});