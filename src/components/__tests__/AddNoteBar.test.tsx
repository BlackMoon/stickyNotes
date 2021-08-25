import { fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
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

    await waitFor(() => expect(wrapper.getByText(/Processing/)).toBeInTheDocument()) 

    expect(spyLoadNotes).toHaveBeenCalledTimes(1);
  })

  test('Add new note', async () => {
    const spyAddNote = jest.spyOn(store, 'addNote');
    wrapper = render(<AddNoteBar store={store}/>);
    
    const { getByText } = wrapper; 

    const buttonEl = getByText(/Add Note/i);
    expect(buttonEl).toBeInTheDocument()
    
    fireEvent.click(buttonEl);
    
    expect(spyAddNote).toHaveBeenCalledTimes(1);

    const processingSpan = getByText(/Processing/i);
    expect(processingSpan).toBeInTheDocument();
  })
});