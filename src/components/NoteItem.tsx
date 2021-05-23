import { observer } from "mobx-react-lite";
import React, { useContext, useState } from "react";
import { FC } from "react";

import { INote } from "../models";
import NoteStore from "../stores/NoteStore";
import './NoteItem.css';

interface NoteItemProps {
	note: INote;
	parentLeft?: number;
	parentTop?: number;
}

const dragOver = (e: any) => {
    e.preventDefault();
    e.target.classList.add('drag-enter');
}

const dragLeave = (e: any) => {
    e.preventDefault();
    e.target.classList.remove('drag-enter');
}

const dragStart = (e: React.DragEvent<HTMLDivElement>, note: INote) => {
	e.dataTransfer.setData('text/plain', note.noteId);
	e.dataTransfer.effectAllowed = "move";
	(e.target as any).style.opacity = .5;
}

const dragEnd = (e: React.DragEvent<HTMLDivElement>) => {
	(e.target as any).style.opacity = 1;
}


const NoteItem: FC<NoteItemProps> = (props) => {
	const  { note, parentLeft = 0, parentTop = 0 } = props;
	
	const noteStore = useContext(NoteStore);
	const { draggedEl, dragging, dropped, setDragging, setDropped, updateNote } = noteStore;

	const [modified, setModified] = useState(false);

	return (
        <div className="note-item" 
			contentEditable={!dragging} 
			data-attr={note.noteId}
			draggable="true" 
			style={{ left: note.x, top: note.y, zIndex: note.z }}
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
			onDragLeave={dragLeave}
			onDragOver={dragOver}
			onDragStart={ 
				e => {
					dragStart(e, note);
					setDragging(true, e.target);
					if (modified) {
						const noteText = (e.target as any).innerText;
						updateNote({...note, noteText});
						setModified(false);
					}
				} 
			}
			onDragEnd={
				e => {
					dragEnd(e);
					setDragging(false);
					if (!dropped) {						
						note.x = e.clientX - parentLeft;
						note.y = e.clientY - parentTop;
						note.z = 1;
						updateNote(note);
					}
				}
			}
			onDrop={
				e => {
					setDropped(true);
					const target: any = e.target;
					const x = e.clientX - parentLeft;	
					const y = e.clientY - parentTop;
					const z = Math.max(target.style.zIndex + 1, draggedEl.style.zIndex + 1);			
					
					target.classList.remove('drag-enter')
					const noteId = e.dataTransfer.getData('text');
					updateNote({ noteId, x, y, z });
				}
			}		
			>
			{note.noteText}
		</div>
	); 
}

export default observer(NoteItem);
