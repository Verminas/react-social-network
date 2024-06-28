import s from "../../layout/Dialogs/Dialogs.module.css";
import React from "react";

type MessageItemProps = {
  message: string
  id: string
}
export const MessageItem = ({message, id}: MessageItemProps) => {
  return (
    <div className={s.messageItem} id={id}>
      <div className={s.messageLogo}/>
      <p className={s.messageText}>{message}</p>
    </div>

  )
}