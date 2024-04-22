import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";
import {dialogItemsData, messageItemsData} from "../../index";

export const Dialogs = () => {

  let dialogItemsElements = dialogItemsData
    .map((i) => <DialogItem name={i.name} id={i.id}/>);
  let messageItemsElements = messageItemsData
    .map(i => <MessageItem message={i.message}/>);


  return (
    <section className={s.dialogs}>
      <div className={s.dialogsItems}>
        <h2 className={s.title}>Dialogs</h2>
        <ul>
          {dialogItemsElements}
        </ul>
      </div>
      <div className={s.messages}>
        {messageItemsElements}
      </div>
    </section>
  )
}
type DialogItemProps = {
  name: string,
  id: string
}

const DialogItem = (props: DialogItemProps) => {
  let dialogPath = `/dialogs/${props.id}`;
  return (
    <li><NavLink to={dialogPath} className={s.dialog}>{props.name}</NavLink></li>
  )
}

type MessageItemProps = {
  message: string
}

const MessageItem = (props: MessageItemProps) => {
  return (
    <p className={s.message}>{props.message}</p>
  )
}