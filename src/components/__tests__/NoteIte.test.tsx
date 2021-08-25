import { act, cleanup, fireEvent, render, RenderResult, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { server } from "../../services/setup-mock-server";
import { NoteStore } from "../../stores/NoteStore";
import { NoteItem } from "../NoteItem";
import { INote } from "../../models";

jest.mock('../../services/config', () => ({ ENDPOINT: 'http://localhost/graphql' }));

describe('NoteItem', () => { 
  const store = new NoteStore();
  let wrapper: RenderResult;

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  beforeAll(() => server.listen())

  beforeEach(() => jest.resetAllMocks())

  test('renders without crashes', async () => {
    const note: INote = { noteId: 'fakeNoteId', noteText: 'FakeNoteText', x: 200 };
    wrapper = render(<NoteItem note={note} store={store}/>)
    const { container, getByText } = wrapper
    
    expect(container.firstChild).toBeTruthy();

    const divEl: HTMLElement = container.querySelector('div.note-item')!;
    expect(divEl).toBeInTheDocument();
    expect(divEl.draggable).toBeTruthy();
    expect(getByText(/FakeNoteText/i)).toBeInTheDocument();
  })

  test('blur && focus && input', async () => {

    const spyUpdateNote = jest.spyOn(store, 'updateNote');

    const note: INote = { noteId: 'fakeNoteId', noteText: 'FakeNoteText' };
    wrapper = render(<NoteItem note={note} store={store}/>)
    const { container } = wrapper

    const divEl = container.querySelector('div.note-item');
    
    fireEvent.focus(divEl!);
    
    fireEvent.input(divEl!);

    fireEvent.blur(divEl!);
    
    expect(spyUpdateNote).toBeCalledTimes(1);
  })

  test('dragStart', async () => {
    const spySetDragging = jest.spyOn(store, 'setDragging');
    

    const note: INote = { noteId: 'fakeNoteId', noteText: 'FakeNoteText' };
    wrapper = render(<NoteItem note={note} store={store}/>)
    const { container } = wrapper

    const divEl = container.querySelector('div.note-item');
    fireEvent.dragStart(divEl!, { 
        dataTransfer: { 
          setData: () => {},
          setDragImage: () => {} 
        } 
      });

    expect(spySetDragging).toBeCalledTimes(1);

  })

})