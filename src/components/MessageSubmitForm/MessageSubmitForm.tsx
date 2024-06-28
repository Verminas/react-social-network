// @flow
import * as React from 'react';
import s from './MessageSubmitForm.module.css';
import {RefObject} from "react";
import {v1} from "uuid";
import {Button} from "../Button/Button";

type Props = {
  refNode?: RefObject<HTMLTextAreaElement>
  onClick: () => void
  placeholder?: string
};
export const MessageSubmitForm = ({refNode, onClick, placeholder}: Props) => {
  return (
    <div className={s.wrapper}>
      <textarea className={s.textarea}
                name="textarea"
                id={v1()}
                placeholder={placeholder}
                ref={refNode}>
      </textarea>
      <Button className={s.button} type={"submit"} onClick={onClick}>Send</Button>
    </div>
  );
};