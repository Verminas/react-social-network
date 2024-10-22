import React from "react";
import { DeleteOutlined, UserOutlined, CheckOutlined } from "@ant-design/icons";
import { Avatar, Button, Card } from "antd";
import { MessageType } from "features/SocialNetwork/api/socialAPI";
import { convertUTCToLocalTime } from "common/utils/convertUTCToLocalTime";
import { Link } from "react-router-dom";
import { PATH } from "common/router/router";

type MessageItemProps = {
  message: MessageType;
  onClick: (id: string) => void;

  avatarSrc: string | null;
  isMyMessage: boolean;
};
export const MessageItem = ({
  message,
  isMyMessage,
  avatarSrc,
  onClick,
}: MessageItemProps) => {
  const { id, senderName, body, viewed, addedAt, senderId } = message;
  const onDeleteHandler = () => {
    onClick(id);
  };
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
        style={{ padding: "5px" }}
        avatar={
          <Link to={`${PATH.PROFILE}/${senderId}`}>
            <Avatar
              size={50}
              icon={<UserOutlined />}
              src={avatarSrc || null}
              alt={"profile-photo"}
            />
          </Link>
        }
        title={senderName}
        description={
          <>
            <p>{body}</p>
            <p
              style={{
                position: "absolute",
                bottom: "10px",
                right: "40px",
              }}
            >
              {convertUTCToLocalTime(addedAt)}
            </p>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={onDeleteHandler}
              style={{ position: "absolute", top: "10px", right: "10px" }}
            ></Button>

            <CheckOutlined
              style={{
                position: "absolute",
                bottom: "15px",
                right: "15px",
                color: viewed ? "blue" : "",
              }}
            />
          </>
        }
      />
    </Card>
  );
};
