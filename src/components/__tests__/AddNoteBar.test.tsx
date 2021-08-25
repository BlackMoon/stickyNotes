import { act, cleanup, fireEvent, getByText, render, RenderResult, screen, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { server } from "../../services/setup-mock-server";
import { NoteStore } from "../../stores/NoteStore";

import { AddNoteBar } from "../AddNoteBar";

jest.mock('../../services/config', () => ({ ENDPOINT: 'http://localhost/graphql' }));

describe('AddNoteBar', () => {
  
  const store = new NoteStore();
  let wrapper: RenderResult;

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  beforeAll(() => server.listen())

  beforeEach(() => jest.resetAllMocks())

  test('renders without crashes', async () => {
    wrapper = render(<AddNoteBar store={store}/>)
    expect(wrapper.container.firstChild).toBeTruthy();
    expect(wrapper.queryByText(/Add Note/i)).toBeInTheDocument();
  })

  test('load notes API', async () => {

    const spyLoadNotes = jest.spyOn(store, 'loadNotes');

    wrapper = render(<AddNoteBar store={store}/>);

    const { getByText } = wrapper;

    expect(spyLoadNotes).toHaveBeenCalledTimes(1);

    const processingSpan = getByText(/Processing/i);
    expect(processingSpan).toBeInTheDocument();
    await waitFor(() => expect(processingSpan).not.toBeInTheDocument()) 

    cleanup();
  })

  test('Add new note', async () => {

    const spyAddNote = jest.spyOn(store, 'addNote');
    jest.spyOn(store, 'loadNotes').mockReturnValue(Promise.resolve([]) as any)
    
    wrapper = render(<AddNoteBar store={store}/>);
   
    const { getByText } = wrapper; 

    const buttonEl = getByText(/Add Note/i);
    expect(buttonEl).toBeInTheDocument();
    
    act(() => {
      fireEvent.click(buttonEl);
    })
    
    expect(spyAddNote).toHaveBeenCalledTimes(1); 

    const processingSpan = getByText(/Processing/i);
    expect(processingSpan).toBeInTheDocument();
    await waitFor(() => expect(processingSpan).not.toBeInTheDocument()) 

    cleanup();
    
  })
});