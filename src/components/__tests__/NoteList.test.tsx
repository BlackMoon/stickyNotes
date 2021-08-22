import { fireEvent, render } from "@testing-library/react";

import NoteList from "../NoteList";

describe('NoteList', () => {

  test('renders without crashing', () => {
    render(<NoteList />);
  })

  test('drag over', () => {
    const { container } = render(<NoteList />);

    fireEvent.dragOver(container);

    fireEvent.drop(container);
  })
});
