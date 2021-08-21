import { useContext, useRef } from "react";
import { observer } from "mobx-react-lite";
import React from "react";

import NoteStore from '../stores/NoteStore';
import NoteItem from "./NoteItem";

import "./NoteList.css";

const NoteList = () => {
  
	const { allEntities, draggedEl, setDragging, updateNote } = useContext(NoteStore);
  const ref = useRef(null);

  const calculatePosition = () => {
    
    const x = parseInt(draggedEl.style.left, 10);
    const y = parseInt(draggedEl.style.top, 10);
    let z = 1;

    const draggedRect = draggedEl.getBoundingClientRect();

    const notes: Array<HTMLElement> = (ref.current as any).querySelectorAll('div.note-item');
    notes
      .forEach(n => {
        if (n !== draggedEl) {
          const rect = n.getBoundingClientRect();
          if ((
                rect.left <= draggedRect.left && 
                rect.right >= draggedRect.left && 
                rect.top <= draggedRect.top && 
                rect.bottom >= draggedRect.top
              ) || (
                rect.left <= draggedRect.right && 
                rect.right >= draggedRect.right && 
                rect.top <= draggedRect.top && 
                rect.bottom >= draggedRect.top
              ) || (
                rect.left <= draggedRect.left && 
                rect.right >= draggedRect.left && 
                rect.top <= draggedRect.bottom && 
                rect.bottom >= draggedRect.bottom
              ) || (
                rect.left <= draggedRect.right && 
                rect.right >= draggedRect.right && 
                rect.top <= draggedRect.bottom && 
                rect.bottom >= draggedRect.bottom
              )
            ) {
            z = Math.max(+n.style.zIndex, z) + 1;
          }
        }
    });

    return {x, y, z};
  }

	return (
		<section 
      className="note-list full-width" 
      ref={ref}
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
          const { x, y, z } = calculatePosition();
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
