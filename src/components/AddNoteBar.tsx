import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";

import { NoteStore } from '../stores/NoteStore';
import "./AddNoteBar.css";
import { withStore } from "../stores/StoreProvider";

const AddNoteBar = ({ store }: { store: NoteStore }) => {
	const { addNote, loadNotes, loading, error } = store;

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

export default withStore(observer(AddNoteBar));