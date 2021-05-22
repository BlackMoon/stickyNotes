import React from "react";
import { FC } from "react";

import { INote } from "../models";
import './NoteItem.css';

interface NoteItemProps {
	note: INote;
}

const NoteItem: FC<NoteItemProps> = (props) => {
	const  { note } = props;
	console.log(note);
	return (
        <div className="note-item">{note.noteText}</div>
	); 
}

export { NoteItem };
