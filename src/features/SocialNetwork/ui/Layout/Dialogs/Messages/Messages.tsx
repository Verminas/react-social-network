import { SubmitForm } from "common/components/SubmitForm/SubmitForm";
import { MessageItem } from "common/components/MessageItem/MessageItem";
import Spinner from "common/components/Spinner/Spinner";
import { Empty } from "antd";
import { useMessages } from "features/SocialNetwork/lib/useMessages";
import { S } from "./Messages.styles";

export const Messages = () => {
  const {
    handleScroll,
    getMessagesWrapperRef,
    onSubmitMessageForm,
    onDeleteBtn,
    messages,
    messagesCount,
    status,
    checkSenderIdWithCurrentUser
  } = useMessages();

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <S.Wrapper>
      <S.MessagesWrapper
        ref={getMessagesWrapperRef}
        onScroll={handleScroll}
      >
        {messagesCount ? (messages.map(m => {
          return (
            <MessageItem
              key={m.id}
              message={m}
              onClick={onDeleteBtn}
              avatarSrc={
                checkSenderIdWithCurrentUser({
                  senderId: m.senderId,
                  variant: "avatarSrc"
                }) as string
              }
              isMyMessage={
                checkSenderIdWithCurrentUser({
                  senderId: m.senderId,
                  variant: "message"
                }) as boolean
              }
            />
          );
        })) : <Empty description={"There are not messages :("} />}
      </S.MessagesWrapper>
      <SubmitForm
        onSubmitForm={onSubmitMessageForm}
        placeholder={"Type your message..."}
      />
    </S.Wrapper>
  );
};
