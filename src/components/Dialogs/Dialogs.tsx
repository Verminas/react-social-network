import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

type messagesPageStatePropsType = {
  messagesPage: {
    dialogItemsData: Array<{
      id: string,
      name: string,
    }>,
    messageItemsData: Array<{
      id: string,
      message: string,
    }>,
  },
};

export const Dialogs = (props: messagesPageStatePropsType) => {

  let dialogItemsElements = props.messagesPage.dialogItemsData
    .map(i => <DialogItem name={i.name} id={i.id}/>);
  let messageItemsElements = props.messagesPage.messageItemsData
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
    <li>
      <img className={s.dialogLogo} src="https://media.istockphoto.com/id/1482199015/ru/%D1%84%D0%BE%D1%82%D0%BE/%D1%81%D1%87%D0%B0%D1%81%D1%82%D0%BB%D0%B8%D0%B2%D1%8B%D0%B9-%D1%89%D0%B5%D0%BD%D0%BE%D0%BA-%D0%B2%D0%B5%D0%BB%D1%8C%D1%88-%D0%BA%D0%BE%D1%80%D0%B3%D0%B8-14-%D0%BD%D0%B5%D0%B4%D0%B5%D0%BB%D1%8C-%D1%81%D0%BE%D0%B1%D0%B0%D0%BA%D0%B0-%D0%BF%D0%BE%D0%B4%D0%BC%D0%B8%D0%B3%D0%B8%D0%B2%D0%B0%D0%B5%D1%82-%D0%B7%D0%B0%D0%B4%D1%8B%D1%85%D0%B0%D0%B5%D1%82%D1%81%D1%8F-%D0%B8-%D1%81%D0%B8%D0%B4%D0%B8%D1%82-%D0%B8%D0%B7%D0%BE%D0%BB%D0%B8%D1%80%D0%BE%D0%B2%D0%B0%D0%BD%D0%BD%D0%BE-%D0%BD%D0%B0.jpg?s=612x612&w=0&k=20&c=oM8l3E4PPUaJbB5xaEOKFvTk8EW0P1uAKCBULHzO0O4=" alt="dialog-logo"/>
      <NavLink to={dialogPath} className={s.dialog}>{props.name}</NavLink>
    </li>
  )
}

type MessageItemProps = {
  message: string
}

const MessageItem = (props: MessageItemProps) => {
  return (
    <div className={s.messageItem}>
      <div className={s.messageLogo}/>
      <p className={s.messageText}>{props.message}</p>
    </div>

  )
}