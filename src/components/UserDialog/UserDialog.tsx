// @flow
import * as React from "react";
import { MessageSubmitForm } from "components/MessageSubmitForm/MessageSubmitForm";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  messagesActions,
  selectMessages,
  selectMessagesCount,
  selectMessagesStatus,
} from "app/reducers/messagesSlice";
import { useAppDispatch } from "app/store";
import { MessageItem } from "components/MessageItem/MessageItem";
import { selectCurrentUser } from "app/reducers/currentUserSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Spinner from "components/Spinner/Spinner";

type Props = {};
export const UserDialog = (props: Props) => {
  const [listRef] = useAutoAnimate<HTMLUnknownElement>();
  const params = useParams<{ userId: string }>();
  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useAppDispatch();
  const messagesCount = useSelector(selectMessagesCount);
  const messages = useSelector(selectMessages);
  const status = useSelector(selectMessagesStatus);

  useEffect(() => {
    if (params.userId) {
      const userId = Number(params.userId);
      dispatch(messagesActions.fetchMessages({ userId }));
    }

    return () => {
      dispatch(messagesActions.clearData());
    };
  }, [params]);

  const onSubmitMessageForm = (message: string) => {
    if (params.userId && message.length) {
      const userId = Number(params.userId);
      dispatch(messagesActions.sendMessage({ message, userId }));
    }
  };

  const onDeleteBtn = (messageId: string) => {
    dispatch(messagesActions.deleteMessage(messageId));
  };

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex", flexDirection: "column" }} ref={listRef}>
        {messagesCount === 0 ? (
          <span>Send first message :)</span>
        ) : (
          messages.map((m) => {
            return (
              <MessageItem
                key={m.id}
                message={m}
                onClick={onDeleteBtn}
                avatarSrc={
                  m.senderId === currentUser.userId
                    ? currentUser.photos.small
                    : null
                }
                isMyMessage={m.senderId === currentUser.userId}
              />
            );
          })
        )}
      </div>
      <MessageSubmitForm
        onClick={onSubmitMessageForm}
        placeholder={"Type your message..."}
      />
    </div>
  );
};
