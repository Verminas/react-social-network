import s from "./MessageItem.module.css";
import React from "react";
import { Avatar } from "../Avatar/Avatar";

type MessageItemProps = {
  message: string;
  id: string;
  avatarSrc: string;
  name: string;
  isMyMessage: boolean;
};
export const MessageItem = ({
  message,
  id,
  name,
  avatarSrc,
  isMyMessage,
}: MessageItemProps) => {
  const finalClassMessageItem =
    s.messageItem + " " + (isMyMessage ? s.myMessage : "");

  return (
    <div className={finalClassMessageItem} id={id}>
      <div className={s.avatarName}>
        <Avatar src={avatarSrc} />
        <span className={s.name}>{name}</span>
      </div>
      <p className={s.messageText}>{message}</p>
    </div>
  );
};
