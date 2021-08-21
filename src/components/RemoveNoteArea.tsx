import React, { useContext } from "react";
import { observer } from "mobx-react-lite";

import NoteStore from '../stores/NoteStore';

import "./RemoveNoteArea.css";
import calculatePosition from "./calculate-position";

const dragOver = (e: any) => {
  e.preventDefault();
  e.target.classList.add('drag-enter');
}

const dragLeave = (e: any) => {
  e.preventDefault();
  e.target.classList.remove('drag-enter');
}

const RemoveNoteArea = () => {
	const { draggedEl, updateNote, removeNote, setDragging } = useContext(NoteStore);;

  const drop = (e: any) => {
    e.preventDefault();

    const noteId = e.dataTransfer.getData('text');
    const {x, y, z} = calculatePosition(draggedEl)

    draggedEl.style.zIndex = z;
    draggedEl.classList.remove('drag-enter');
    e.target.classList.remove('drag-enter');
    setDragging(false);
    
    const res = window.confirm("Do you really want to delete note?");
    
    if (res === true) {
      removeNote({ noteId });
    } else {
      updateNote({ noteId, x, y, z });
    }
  }

  return (
    <div className="remove-area" 
        onDragOver={dragOver} 
        onDragLeave={dragLeave}
        onDrop={drop}>
        <a href="#/" className="link-info">Drop note here to remove</a>
    </div>
  );
}

export default observer(RemoveNoteArea);