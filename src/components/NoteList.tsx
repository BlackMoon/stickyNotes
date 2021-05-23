import React, { useContext, useEffect, useState } from "react";
import { observer } from "mobx-react-lite";

import NoteStore from '../stores/NoteStore';
import NoteItem from "./NoteItem";

import "./NoteList.css";

const NoteList = () => {
	const noteStore = useContext(NoteStore);
	const { allEntities, addNote, loadNotes, loading } = noteStore;

	const [parentLeft, setParentLeft] = useState(0);
	const [parentTop, setParentTop] = useState(0);

	useEffect(() => {
		(async () => loadNotes())();
	});

	return (
		<>
		<div className="toolbar">
			<a href="#/" className="primary-link" onClick={_ => addNote()}>Add note</a>
			{loading ? (<span>Processing...</span>) : null}
		</div>
		<section className="note-list" 
			ref={el => {
        
        	if (el) {
				const domRect = el.getBoundingClientRect();
				setParentLeft(domRect.left);
				setParentTop(domRect.top);
			}
      	}}>
		{allEntities.map(n => 
			<NoteItem key={n.noteId} 
				note={n} 
				parentLeft={parentLeft} 
				parentTop={parentTop}>
			</NoteItem>)}
		</section>
		</>
	);
}

export default observer(NoteList);
