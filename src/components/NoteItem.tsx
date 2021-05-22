import React from "react";
import { FC } from "react";

import { INote } from "../models";
import './NoteItem.css';

interface NoteItemProps {
	note: INote;
}

const dragStart = (e: React.DragEvent<HTMLDivElement>, note: INote) => {
	e.dataTransfer.setData('text/plain', note.noteId);
}

const NoteItem: FC<NoteItemProps> = (props) => {
	const  { note } = props;
	return (
        <div className="note-item" draggable="true" 
			onDragStart={ e => dragStart(e, note) }>
			{note.noteText}
		</div>
	); 
}

export { NoteItem };
