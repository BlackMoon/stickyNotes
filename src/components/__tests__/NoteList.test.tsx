import { act, fireEvent, render, RenderResult, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';
import { server } from "../../services/setup-mock-server";
import { NoteStore } from "../../stores/NoteStore";
import { NoteList } from "../NoteList";
import * as calculatePosition from "../calculate-position";

jest.mock('../../services/config', () => ({ ENDPOINT: 'http://localhost/graphql' }));

describe('NoteList', () => {

  const store = new NoteStore();
  let wrapper: RenderResult;

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  beforeAll(() => server.listen())

  beforeEach(() => jest.resetAllMocks())

  test('renders without crashing', () => {
    wrapper = render(<NoteList store={store}/>);
    const { container } = wrapper;
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector('section.note-list')).toBeInTheDocument();
  })

  test('render notes', async () => {
    await store.loadNotes();
    const { container } = render(<NoteList store={store}/>);

    const noteEls = container.querySelectorAll('div.note-item');
    expect(noteEls.length).toEqual(2);
  })

  test('drag over', async () => {
    // @ts-ignore
    calculatePosition.default = jest.fn(() => ({ x: 1, y: 2, z: 3}));
    await store.loadNotes();

    const { container } = render(<NoteList store={store}/>);
    const sectionEl = container.querySelector('section.note-list');

    const draggedEl = { 
      classList: { remove: () => {} },
      getBoundingClientRect: () => {},
      style: {}
    };

    act(() => {
      store.setDragging(draggedEl, 10);
    });
    fireEvent.dragOver(sectionEl!);
    
    fireEvent.drop(sectionEl!, { dataTransfer: { getData: () => 'noteId' } });
  })
});
