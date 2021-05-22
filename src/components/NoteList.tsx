import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import NoteStore from '../stores/NoteStore';
import { NoteItem } from "./NoteItem";

import "./NoteLIst.css";

const NoteList = () => {
	const noteStore = useContext(NoteStore);
	const { allEntities, loadNotes } = noteStore;

	useEffect(() => {
		(async () => loadNotes())();
	});

	return (
		<div className="container">
		{allEntities.map(n => <NoteItem key={n.noteId} note={n}></NoteItem>)}
		</div>
	);
}

export default observer(NoteList);
