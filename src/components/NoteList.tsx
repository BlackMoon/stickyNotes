import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import NoteStore from '../stores/NoteStore';
import NoteItem from "./NoteItem";

import "./NoteList.css";

const NoteList = () => {
	const noteStore = useContext(NoteStore);
	const { allEntities, addNote, loadNotes, loading } = noteStore;

	useEffect(() => {
		(async () => loadNotes())();
	});

	return (
		<>
		<div className="toolbar">
			<a href="#/" className="primary-link" onClick={_ => addNote()}>Add note</a>
			{loading ? (<span>Processing...</span>) : null}
		</div>
		<section className="note-list">
		{allEntities.map(n => <NoteItem key={n.noteId} note={n}></NoteItem>)}
		</section>
		</>
	);
}

export default observer(NoteList);
