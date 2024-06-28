import s from "../../layout/Dialogs/Dialogs.module.css";
import React from "react";

type MessageItemProps = {
  message: string
}
export const MessageItem = (props: MessageItemProps) => {
  return (
    <div className={s.messageItem}>
      <div className={s.messageLogo}/>
      <p className={s.messageText}>{props.message}</p>
    </div>

  )
}