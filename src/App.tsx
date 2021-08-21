import React from "react";
import AddNoteBar from "./components/AddNoteBar";
import NoteList from "./components/NoteList";
import RemoveNoteArea from "./components/RemoveNoteArea";

const App = () => {
  
  return (
    <>
    <div className="container flex">
      <AddNoteBar />
      <RemoveNoteArea />
    </div>
    <NoteList />
    </>
  );
};

export default App;
