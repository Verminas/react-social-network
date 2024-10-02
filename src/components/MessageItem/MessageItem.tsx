import s from "./MessageItem.module.css";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";
import { getLastSeenStatus } from "utils/getLastSeenStatus";
import { MessageType } from "api/socialAPI";

type MessageItemProps = {
  message: MessageType;

  avatarSrc: string | null;
  isMyMessage: boolean;
};
export const MessageItem = ({
  message,
  isMyMessage,
  avatarSrc,
}: MessageItemProps) => {
  const { id, senderName, body } = message;
  return (
    <Card
      style={{
        minWidth: 300,
        maxWidth: 400,
        alignSelf: isMyMessage ? "flex-end" : "flex-start",
        marginBottom: "10px",
      }}
      id={id}
    >
      <Card.Meta
        avatar={
          <Avatar
            size={50}
            icon={<UserOutlined />}
            src={avatarSrc || null}
            alt={"profile-photo"}
          />
        }
        title={senderName}
        description={
          <>
            <p>{body}</p>
            <p></p>
          </>
        }
      />
    </Card>
  );
};
