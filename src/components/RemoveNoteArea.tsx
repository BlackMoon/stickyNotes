import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import { INote } from "../models";
import NoteStore from '../stores/NoteStore';

import "./RemoveNoteArea.css";


const dragOver = (e: any) => {
    e.preventDefault();
    e.target.classList.add('drag-enter');
}

const dragLeave = (e: any) => {
    e.preventDefault();
    e.target.classList.remove('drag-enter');
}

const drop = (e: React.DragEvent<HTMLDivElement>, removeNote: (note: INote) => Promise<void>) => {
    const noteId = e.dataTransfer.getData('text');
    const res = window.confirm("Do you really want to delete note?");
    if (res === true) {
        removeNote({ noteId });
    }
    e.dataTransfer.clearData();
}

const RemoveNoteArea = () => {
    const noteStore = useContext(NoteStore);
	const { removeNote } = noteStore;
    return (
        <div className="remove-area" 
            onDragOver={dragOver} 
            onDragLeave={dragLeave}
            onDrop={e => drop(e, removeNote)}>
            Drop note here to remove
        </div>
    );
}

export default observer(RemoveNoteArea);