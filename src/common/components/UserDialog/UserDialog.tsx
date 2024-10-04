// @flow
import * as React from "react";
import { SubmitForm } from "common/components/SubmitForm/SubmitForm";
import { useParams } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  messagesActions,
  selectMessages,
  selectMessagesCount,
  selectMessagesStatus,
} from "features/SocialNetwork/model/messagesSlice";
import { useAppDispatch } from "app/store";
import { MessageItem } from "common/components/MessageItem/MessageItem";
import { selectCurrentUser } from "features/SocialNetwork/model/currentUserSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import Spinner from "common/components/Spinner/Spinner";
import { Empty } from "antd";

type Props = {};
export const UserDialog = (props: Props) => {
  const ref = useRef<HTMLDivElement | null>(null);
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

  // для прокрутки сообщений при отправке!
  useEffect(() => {
    // if (status === "loading") return;

    const target = ref.current;

    if (!target) return;

    const observer = new MutationObserver(() => {
      const top = target.scrollHeight;
      target.scroll({ top, behavior: "smooth" });
    });

    observer.observe(target, { childList: true });

    return () => {
      observer.disconnect();
    };
  }, [status]);

  let getRef = useCallback((node: HTMLDivElement) => {
    listRef(node);
    ref.current = node;
  }, []);

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          height: "70vh",
          overflowY: "auto",
        }}
        ref={getRef}
      >
        {messagesCount === 0 ? (
          <Empty description={"There are not messages :("} />
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
      <SubmitForm
        onSubmitForm={onSubmitMessageForm}
        placeholder={"Type your message..."}
      />
    </div>
  );
};
