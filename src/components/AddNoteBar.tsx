import React, { FC, useEffect } from "react";
import { observer } from "mobx-react-lite";

import { NoteStore } from '../stores/NoteStore';
import { withStore } from "../stores/StoreProvider";
import "./AddNoteBar.css";

interface IAddNoteBarProps {
  store: NoteStore
}

export const AddNoteBar: FC<IAddNoteBarProps> = ({ store }) => {
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