import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

export const Dialogs = () => {
  return (
    <section className={s.dialogs}>
      <div className={s.dialogsItems}>
        <h2 className={s.title}>Dialogs</h2>
        <ul>
          <DialogItem name={'Dmitry'} id={'1'}/>
          <DialogItem name={'Sveta'} id={'2'}/>
          <DialogItem name={'Valera'} id={'3'}/>
          <DialogItem name={'Alex'} id={'4'}/>
          <DialogItem name={'Natali'} id={'5'}/>
        </ul>
      </div>
      <div className={s.messages}>
        <MessageItem message={'Hello'}/>
        <MessageItem message={'How are you?'}/>
        <MessageItem message={'I am fine. Thank you. What do you do?'}/>
        <MessageItem message={'I am working for my studying project now. It is my homework'}/>
        <MessageItem message={'Oh, I hope it is not mathematics :('}/>
      </div>
    </section>
  )
}
type DialogItemProps = {
  name: string,
  id: string
}

const DialogItem = (props: DialogItemProps) => {
  return (
    <li><NavLink to={`/dialogs/${props.id}`} className={s.dialog}>{props.name}</NavLink></li>
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