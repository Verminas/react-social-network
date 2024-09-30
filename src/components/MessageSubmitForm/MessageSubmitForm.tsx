// @flow
import * as React from "react";
import s from "./MessageSubmitForm.module.css";
import { useRef, KeyboardEvent } from "react";
import { v1 } from "uuid";
import { Button } from "../Button/Button";

type Props = {
  onClick: (value: string) => void;
  placeholder?: string;
};
export const MessageSubmitForm = ({ onClick, placeholder }: Props) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const clearTextArea = () => {
    if (textareaRef && textareaRef.current) {
      textareaRef.current.value = "";
    }
  };

  const onClickHandler = () => {
    textareaRef &&
      textareaRef.current &&
      textareaRef.current.value.trim().length > 0 &&
      onClick(textareaRef.current.value.trim());

    clearTextArea();
  };

  const onKeyDownHandler = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    e.key === "Enter" && onClickHandler();
  };

  return (
    <div className={s.wrapper}>
      <textarea
        className={s.textarea}
        name="textarea"
        id={v1()}
        placeholder={placeholder}
        ref={textareaRef}
        autoFocus
        onKeyDown={onKeyDownHandler}
      ></textarea>
      <Button className={s.button} type={"submit"} onClick={onClickHandler}>
        Send
      </Button>
    </div>
  );
};
