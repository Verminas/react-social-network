import React from "react";
import { DeleteOutlined, UserOutlined } from "@ant-design/icons";
import { MessageType } from "../../../../../api/socialAPI";
import { convertUTCToLocalTime } from "common/utils/convertUTCToLocalTime";
import { Link } from "react-router-dom";
import { PATH } from "common/router/router";
import { S } from "./MessageItem.styles";

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
                              onClick
                            }: MessageItemProps) => {
  const { id, senderName, body, viewed, addedAt, senderId } = message;

  const onDeleteHandler = () => {
    onClick(id);
  };

  return (
    <S.StyledCard
      id={id}
      ismymessage={isMyMessage.toString() || undefined}
    >
      <S.StyledCardMeta
        avatar={
          <Link to={`${PATH.PROFILE}/${senderId}`}>
            <S.StyledAvatar
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
            <S.Time>
              {convertUTCToLocalTime(addedAt)}
            </S.Time>
            <S.StyledButton
              type="text"
              icon={<DeleteOutlined />}
              onClick={onDeleteHandler}
            />
            <S.CheckIcon />
          </>
        }
      />
    </S.StyledCard>
  );
};
