import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";

import NoteStore from '../stores/NoteStore';

import "./RemoveNoteArea.css";

const RemoveNoteArea = () => {
    const noteStore = useContext(NoteStore);
	
    return (<div className="remove-area">
        Drop note here to remove
    </div>);
}

export default observer(RemoveNoteArea);