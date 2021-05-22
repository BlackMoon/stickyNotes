import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import NoteStore from '../stores/NoteStore';
import { NoteItem } from "./NoteItem";


const NoteList = () => {
	const noteStore = useContext(NoteStore);
	const { allEntities, loadNotes } = noteStore;

	useEffect(() => {
		(async () => loadNotes())();
	});

	return (
		<>
		{allEntities.map(n => <NoteItem key={n.noteId} note={n}></NoteItem>)}
		</>
	);
}

export default observer(NoteList);
