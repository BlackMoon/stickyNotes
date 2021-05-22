import React from "react";

import NoteList from "./components/NoteList";
import RemoveNoteArea from "./components/RemoveNoteArea";

const App = () => {
  return (
    <div className="container flex">
      <NoteList />
      <RemoveNoteArea />
    </div>
  );
};

export default App;
