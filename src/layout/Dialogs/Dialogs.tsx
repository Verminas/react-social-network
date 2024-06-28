import React, {useRef} from "react";
import s from './Dialogs.module.css';
import {MessageSubmitForm} from "../../components/MessageSubmitForm/MessageSubmitForm";
import {DialogLink} from "../../components/DialogLink/DialogLink";
import {MessageItem} from "../../components/MessageItem/MessageItem";

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
  let messageTextArea = useRef<HTMLTextAreaElement>(null);
  let sendMyMessage = () => {
    let messageText: string | undefined = messageTextArea.current?.value;
    alert(messageText);
  }
  // elements
  let dialogItemsElements = props.messagesPage.dialogItemsData
    .map(i => <DialogLink name={i.name} id={i.id}/>);
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
      <div>
        <div className={s.messages}>{messageItemsElements}</div>
        <MessageSubmitForm onClick={sendMyMessage} refNode={messageTextArea} placeholder={'your message...'}/>
      </div>
    </section>
  )
}

