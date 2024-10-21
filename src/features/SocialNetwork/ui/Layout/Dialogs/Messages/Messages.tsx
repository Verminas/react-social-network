// @flow
import * as React from "react";
import { SubmitForm } from "common/components/SubmitForm/SubmitForm";
import { MessageItem } from "common/components/MessageItem/MessageItem";
import Spinner from "common/components/Spinner/Spinner";
import { Empty } from "antd";
import { useMessages } from "features/SocialNetwork/lib/useMessages";

export const Messages = () => {
  const {
    handleScroll,
    getMessagesWrapperRef,
    onSubmitMessageForm,
    onDeleteBtn,
    messages,
    messagesCount,
    status,
    checkSenderIdWithCurrentUser,
  } = useMessages();

  const commonWrapperStyles = {
    display: "flex",
    flexDirection: "column",
    height: "100%",
    justifyContent: "space-between",
  } as const;

  const messagesWrapperStyles = {
    display: "flex",
    flexDirection: "column",
    height: "70vh",
    overflowY: "auto",
    overflowX: "hidden",
    scrollBehavior: "smooth",
  } as const;

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div style={commonWrapperStyles}>
      <div
        style={messagesWrapperStyles}
        ref={getMessagesWrapperRef}
        onScroll={handleScroll}
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
                  checkSenderIdWithCurrentUser({
                    senderId: m.senderId,
                    variant: "avatarSrc",
                  }) as string
                }
                isMyMessage={
                  checkSenderIdWithCurrentUser({
                    senderId: m.senderId,
                    variant: "message",
                  }) as boolean
                }
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
