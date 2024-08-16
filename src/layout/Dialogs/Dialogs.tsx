import React, {useRef, useState} from "react";
import s from './Dialogs.module.css';
import {MessageSubmitForm} from "../../components/MessageSubmitForm/MessageSubmitForm";
import {DialogLink} from "../../components/DialogLink/DialogLink";
import {MessageItem} from "../../components/MessageItem/MessageItem";
import {DialogItemType, MessageItemsType} from "../../redux/stateData";
import {useParams} from "react-router-dom";
import {ErrorPage} from "../ErrorPage/ErrorPage";
import {addNewMessageAC} from "../../app/reducers/messagesReducer";
import {useAppDispatch} from "../../app/store";
import {useSelector} from "react-redux";
import {selectMessages} from "../../app/selectors";

type messagesPageStatePropsType = {
  dialogs: DialogItemType[]
  userID: number
};

export const Dialogs = ({dialogs, userID}: messagesPageStatePropsType) => {
  const params = useParams<{ userId: string }>();
  const userId = Number(params.userId) || 1;
  const dispatch = useAppDispatch();
  const messages = useSelector(selectMessages)

  const addNewMessage = (userID: number, message: string) => {
    dispatch(addNewMessageAC(userID, message))
  }

  const addNewMessageHandler = (value: string) => {
    if (userId) {
      addNewMessage(userId, value);
    }
  }
  // elements
  const dialogItemsElements = dialogs.map(i => <DialogLink name={i.name} id={i.id} key={i.id} src={i.avatarSrc}/>);
  const messageItemsElements = messages[userId]
    ? messages[userId].map(i => <MessageItem message={i.message}
                                             id={i.messageID}
                                             key={i.message}
                                             name={i.name}
                                             avatarSrc={i.avatarSrc}
                                             isMyMessage={i.userID === userID}
    />)
    : <span>There are not messages</span>;

  const dialogPageContent = messages[userId]
    ? (<section className={s.dialogs}>
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
    </section>)
    : <ErrorPage/>

  return (
    <section className={s.dialogs}>
      {
        messages[userId]
          ? <>
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
          </>
          : <ErrorPage/>
      }
    </section>
  )
}

