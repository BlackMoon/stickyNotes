import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { FC } from "react";

import { INote } from "../models";
import NoteStore from "../stores/NoteStore";
import './NoteItem.css';

interface NoteItemProps {
	note: INote;
}

const dragStart = (e: React.DragEvent<HTMLDivElement>, note: INote) => {
	e.dataTransfer.setData('text/plain', note.noteId);
}

const NoteItem: FC<NoteItemProps> = (props) => {
	const  { note } = props;

	const noteStore = useContext(NoteStore);
	const { editMode, setEditMode, updateNote } = noteStore;
	
	return (
        <div className="note-item" 
			contentEditable={editMode} 
			draggable="true" 
			suppressContentEditableWarning={true}
			onBlur={
				e => { 
					const noteText = e.target.innerText;
					updateNote({...note, noteText});
				}
			}
			onDragStart={ 
				e => {
					dragStart(e, note);
					const noteText = (e.target as any).innerText;
					updateNote({...note, noteText});
				} 
			}
			onDoubleClick={e => setEditMode(true)}
			>
			{note.noteText}
		</div>
	); 
}

export default observer(NoteItem);
