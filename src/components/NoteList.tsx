import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import NoteStore from '../stores/NoteStore';
import { NoteItem } from "./NoteItem";

import "./NoteList.css";

const NoteList = () => {
	const noteStore = useContext(NoteStore);
	const { allEntities, loadNotes } = noteStore;

	useEffect(() => {
		(async () => loadNotes())();
	});

	return (
		<div className="note-list">
		{allEntities.map(n => <NoteItem key={n.noteId} note={n}></NoteItem>)}
		</div>
	);
}

export default observer(NoteList);
