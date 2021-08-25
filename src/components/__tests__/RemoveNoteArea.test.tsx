import { act, fireEvent, render, RenderResult, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';

import { server } from "../../services/setup-mock-server";
import { NoteStore } from "../../stores/NoteStore";
import { RemoveNoteArea } from "../RemoveNoteArea";
import * as calculatePosition from "../calculate-position";

jest.mock('../../services/config', () => ({ ENDPOINT: 'http://localhost/graphql' }));



describe('RemoveNoteArea', () => {
  const store = new NoteStore();
  let wrapper: RenderResult;

  afterAll(() => server.close())

  afterEach(() => server.resetHandlers())

  beforeAll(() => server.listen())

  beforeEach(() => jest.resetAllMocks())

  test('renders without crashing', () => {
    wrapper = render(<RemoveNoteArea store={store}/>);
    const { container } = wrapper;
    expect(container.firstChild).toBeTruthy();
    expect(container.querySelector('div.remove-area')).toBeInTheDocument();
  })

  test('drag over && drag leave && drop', async () => {
    window.confirm = jest.fn()
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    const spyRemoveNote = jest.spyOn(store, 'removeNote');
    const spyUpdateNote = jest.spyOn(store, 'updateNote');

    // @ts-ignore
    calculatePosition.default = jest.fn(() => ({ x: 1, y: 2, z: 3}));
    await store.loadNotes();
    
    const { container } = render(<RemoveNoteArea store={store}/>);
    const divEl = container.querySelector('div.remove-area');

    const draggedEl = { 
      classList: { remove: () => {} },
      getBoundingClientRect: () => {},
      style: {}
    };

    act(() => {
      store.setDragging(draggedEl, 10);
    });
    fireEvent.dragOver(divEl!);

    fireEvent.dragLeave(divEl!);
    
    fireEvent.drop(divEl!, { dataTransfer: { getData: () => 'noteId' } });

    // second drop for testing window.confirm === false case
    act(() => {
      store.setDragging(draggedEl, 10);
    });

    fireEvent.drop(divEl!, { dataTransfer: { getData: () => 'noteId' } });

    expect(spyRemoveNote).toBeCalledTimes(1);
    expect(spyUpdateNote).toBeCalledTimes(1);
  })

})