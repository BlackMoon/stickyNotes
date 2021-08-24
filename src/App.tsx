import React from "react";
import AddNoteBar from "./components/AddNoteBar";
import NoteList from "./components/NoteList";
import RemoveNoteArea from "./components/RemoveNoteArea";
import { NoteStore } from "./stores/NoteStore";
import { StoreProvider } from "./stores/StoreProvider";

const store = new NoteStore();

const App = () => {
  
  return (
    <StoreProvider store={store}>
      <div className="container flex">
        <AddNoteBar />
        <RemoveNoteArea />
      </div>
      <NoteList/>
    </StoreProvider>
  );
};

export default App;
