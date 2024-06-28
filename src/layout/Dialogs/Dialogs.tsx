import React, {useRef, useState} from "react";
import s from './Dialogs.module.css';
import {MessageSubmitForm} from "../../components/MessageSubmitForm/MessageSubmitForm";
import {DialogLink} from "../../components/DialogLink/DialogLink";
import {MessageItem} from "../../components/MessageItem/MessageItem";
import {MessageItemsData, MessagesPageType, myUser} from "../../redux/stateData";

type messagesPageStatePropsType = {
  messagesPage: MessagesPageType
  addNewMessage: (userID: string, message: string) => void
  messages: MessageItemsData
};

export const Dialogs = ({messagesPage: {dialogItemsData}, addNewMessage, messages}: messagesPageStatePropsType) => {
  const [userDialogID, setUserDialogID] = useState<string>('1')
  console.log(userDialogID)

  const addNewMessageHandler = (value: string) => {
    addNewMessage(userDialogID, value);
  }
  // elements
  const dialogItemsElements = dialogItemsData.map(i => <DialogLink onClick={setUserDialogID} name={i.name} id={i.id} key={i.id} src={i.avatarSrc}/>);
  const messageItemsElements = messages[userDialogID].map(i => <MessageItem message={i.message}
                                                                            id={i.messageID}
                                                                            key={i.message}
                                                                            name={i.name}
                                                                            avatarSrc={i.avatarSrc}
                                                                            isMyMessage={i.userID === myUser.id}
  />);

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
        <MessageSubmitForm onClick={addNewMessageHandler} placeholder={'your message...'}/>
      </div>
    </section>
  )
}

