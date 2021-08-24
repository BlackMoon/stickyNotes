import { observer } from "mobx-react-lite";
import { useRef, useState } from "react";
import { useCallback } from "react";
import { FC } from "react";

import { INote } from "../models";
import { NoteStore } from "../stores/NoteStore";
import { withStore } from "../stores/StoreProvider";
import './NoteItem.css';

const FOCUSED_ZINDEX = 100;

interface NoteItemProps {
	note: INote;
  store: NoteStore
}

const NoteItem: FC<NoteItemProps> = ({ note, store }) => {
	
	const { updateNote, draggedEl, setDragging } = store;
	const [modified, setModified] = useState(false);
  const ref = useRef(null);

  const updateNoteText = useCallback((e: any) => {
    if (modified) {
      const noteText = e.target.innerText;
      updateNote({...note, noteText});
      setModified(false);
    }
  }, [modified, note, updateNote]);

	return (
    <div className="note-item" 
			contentEditable={ draggedEl !== ref.current }
			data-attr={note.noteId}
			draggable
      ref={ref}
			style={{ left: note.x, top: note.y, zIndex: note.z }}
			suppressContentEditableWarning
			onBlur={e => {
          (ref.current as any).style.zIndex = note.z;
          updateNoteText(e);
        }
      }
      onDragStart={(e: any) => {
          const rect = (ref.current as any).getBoundingClientRect();
          const offsetX = e.clientX - rect.left;
          const offsetY = e.clientY - rect.top;
          updateNoteText(e);
          e.dataTransfer.setData("text", note.noteId);
          e.dataTransfer.setDragImage(new Image(), 0, 0);
          e.target.classList.add('drag-enter');
          setDragging(e.target, offsetX, offsetY);
        }
      }
      onFocus={e => (ref.current as any).style.zIndex = FOCUSED_ZINDEX }
			onInput={e => setModified(true) }	
    >
			{note.noteText}
		</div>
	); 
}

export default withStore(observer(NoteItem));
