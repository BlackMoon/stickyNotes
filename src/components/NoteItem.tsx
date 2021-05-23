import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
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
	const { dragging, setDragging, updateNote } = noteStore;

	const [modified, setModified] = useState(false);

	return (
        <div className="note-item" 
			contentEditable={!dragging} 
			draggable="true" 
			suppressContentEditableWarning={true}
			onBlur={
				e => { 
					if (modified) {
						const noteText = e.target.innerText;
						updateNote({...note, noteText});
						setModified(false);
					}
				}
			}
			onInput={e => setModified(true)}
			onDragStart={ 
				e => {
					dragStart(e, note);
					setDragging(true);
					if (modified) {
						const noteText = (e.target as any).innerText;
						updateNote({...note, noteText});
						setModified(false);
					}
				} 
			}
			onDragEnd={e => setDragging(false)}			
			>
			{note.noteText}
		</div>
	); 
}

export default observer(NoteItem);
