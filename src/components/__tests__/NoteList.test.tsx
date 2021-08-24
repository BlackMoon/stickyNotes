import { fireEvent, render, RenderResult } from "@testing-library/react";

import NoteList from "../NoteList";

describe('NoteList', () => {

  let wrapper: RenderResult;

  beforeEach(() => {
    wrapper = render(<NoteList/>);
  });

  test('renders without crashing', () => {
    render(<NoteList />);
  })

  xtest('drag over', () => {
    const { container } = render(<NoteList />);

    fireEvent.dragOver(container);

    fireEvent.drop(container);
  })
});
