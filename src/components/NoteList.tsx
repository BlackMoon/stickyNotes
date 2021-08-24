import { observer } from "mobx-react-lite";
import React from "react";

import { NoteStore } from '../stores/NoteStore';
import NoteItem from "./NoteItem";
import calculatePosition from "./calculate-position";

import "./NoteList.css";
import { withStore } from "../stores/StoreProvider";

const NoteList = ({ store }: { store: NoteStore })  => {
  
	const { allEntities, draggedEl, offsetX, offsetY, setDragging, updateNote } = store;
  
	return (
		<section 
      className="note-list full-width" 
      onDragOver={(e:any) => { 
          e.preventDefault();
          draggedEl!.style.left = `${e.clientX - offsetX}px`;
          draggedEl!.style.top = `${e.clientY - offsetY}px`;
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
		  {allEntities.map(n => <NoteItem key={n.noteId} note={n} data-testid={n.noteId}></NoteItem>)}
		</section>
	);
}

export default withStore(observer(NoteList));
