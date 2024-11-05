import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import {S} from "./EditableSpan.styles"

type Props = {
  title: string;
  editItem: (text: string) => void;
};
export const EditableSpan = ({ title, editItem }: Props) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [text, setText] = useState(title);

  useEffect(() => {
    setText(title);
  }, [title]);

  const onEditMode = () => {
    setEditMode(true);
  };

  const offEditMode = () => {
    setEditMode(false);
    editItem(text);
  };

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  const onKeyDownEnter = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      offEditMode();
    }
  };

  return (
    <>
      {editMode ? (
        <S.StyledInput
          type="text"
          value={text}
          onBlur={offEditMode}
          onChange={onChangeInput}
          onKeyDown={onKeyDownEnter}
          autoFocus
        />
      ) : (
        <span onDoubleClick={onEditMode}>{title}</span>
      )}
    </>
  );
};
