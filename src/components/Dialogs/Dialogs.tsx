import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

export const Dialogs = () => {

  const dialogItemsData = [
    {
      id: '1',
      name: 'Dmitry',
    },
    {
      id: '2',
      name: 'Sveta',
    },
    {
      id: '3',
      name: 'Valera',
    },
    {
      id: '4',
      name: 'Alex',
    },
    {
      id: '5',
      name: 'Natali',
    },
    {
      id: '6',
      name: 'Kevin',
    },
  ];

  const messageItemsData = [
    {
      id: '1',
      message: 'Hello',
    },
    {
      id: '2',
      message: 'How are you?',
    },
    {
      id: '3',
      message: 'I am fine. Thank you. What do you do?',
    },
    {
      id: '4',
      message: 'I am working for my studying project now. It is my homework',
    },
    {
      id: '5',
      message: 'Oh, I hope it is not mathematics :(',
    },
  ];

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