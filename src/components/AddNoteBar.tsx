import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import NoteStore from '../stores/NoteStore';
import "./AddNoteBar.css";

const AddNoteBar = () => {
  const noteStore = useContext(NoteStore);
	const { addNote, loadNotes, loading, error } = noteStore;

  useEffect(() => {
		(async () => loadNotes())();
	}, [loadNotes]);

  return (
    <div className="toolbar">
      <a href="#/" className="primary-link" onClick={_ => addNote()}>Add note</a>
			{loading ? (<span>Processing...</span>) : (error ? '' + error : null) }
		</div>
  )
}

export default observer(AddNoteBar);