// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent,useState} from "react";

type Props = {
  title: string
  editItem: (text: string) => void
};
export const EditableSpan = ({title, editItem}: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [text, setText] = useState(title)

  const onEditMode = () => {
    setEditMode(true)
  }

  const offEditMode = () => {
    setEditMode(false)
    editItem(text)
  }

  const onChangeInput = (e: ChangeEvent<HTMLInputElement> ) => {
    setText(e.currentTarget.value)
  }

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement> ) => {
    if(e.key === 'Enter'){
      offEditMode()
    }
  }

  return (
    <>
      {editMode
        ? <input type="text" value={text} onBlur={offEditMode} onChange={onChangeInput} onKeyDown={onKeyDownEnter} autoFocus/>
        : <span onDoubleClick={onEditMode}>{title}</span>
      }
    </>
  );
};