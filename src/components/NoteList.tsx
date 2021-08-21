import { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import React from "react";

import NoteStore from '../stores/NoteStore';
import NoteItem from "./NoteItem";
import calculatePosition from "./calculate-position";

import "./NoteList.css";

const NoteList = () => {
  
	const { allEntities, draggedEl, setDragging, updateNote } = useContext(NoteStore);

	return (
		<section 
      className="note-list full-width" 
      onDragOver={(e:any) => { 
          e.preventDefault();
          draggedEl!.style.left = `${e.clientX - 100}px`;
          draggedEl!.style.top = `${e.clientY - 100}px`;
        }
      }
      onDrop={(e: any) => {
          e.preventDefault();
          draggedEl.classList.remove('drag-enter');

          const noteId = e.dataTransfer.getData("text");
          const { x, y, z } = calculatePosition(draggedEl);
          draggedEl.style.zIndex = z;
          updateNote({ noteId, x, y, z });
          setDragging(false);
        }
      }
		>
		  {allEntities.map(n => <NoteItem key={n.noteId} note={n} ></NoteItem>)}
		</section>
	);
}

export default observer(NoteList);
