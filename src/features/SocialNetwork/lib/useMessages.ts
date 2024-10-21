import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "app/store";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/SocialNetwork/model/currentUserSlice";
import {
  messagesActions,
  selectMessages,
  selectMessagesCount,
  selectMessagesStatus,
} from "features/SocialNetwork/model/messagesSlice";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export const useMessages = () => {
  const messagesWrapperRef = useRef<HTMLDivElement | null>(null);
  const params = useParams<{ userId: string }>();

  const dispatch = useAppDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const messagesCount = useSelector(selectMessagesCount);
  const messages = useSelector(selectMessages);
  const status = useSelector(selectMessagesStatus);

  const [currentMessagesPage, setCurrentMessagesPage] = useState(1);
  const [scrollHeight, setScrollHeight] = useState<any>(null);
  const [listRef] = useAutoAnimate<HTMLUnknownElement>();

  const scrollMessagesDown = () => {
    if (messagesWrapperRef.current) {
      messagesWrapperRef.current.scrollTop =
        messagesWrapperRef.current.scrollHeight;
    }
  };

  const scrollMessagesToPreviousPosition = () => {
    if (messagesWrapperRef.current) {
      messagesWrapperRef.current.scrollTop =
        messagesWrapperRef.current?.scrollHeight - scrollHeight;
    }
  };

  useEffect(() => {
    if (params.userId) {
      const userId = Number(params.userId);
      dispatch(
        messagesActions.fetchMessages({ userId, page: currentMessagesPage }),
      ).then(() => {
        scrollMessagesDown();
        console.dir(messagesWrapperRef.current);
      });
    }

    return () => {
      dispatch(messagesActions.clearData());
    };
  }, [params]);

  const onSubmitMessageForm = (message: string) => {
    if (params.userId && message.length) {
      const userId = Number(params.userId);
      dispatch(messagesActions.sendMessage({ message, userId })).then(() => {
        scrollMessagesDown();
      });
    }
  };

  const onDeleteBtn = (messageId: string) => {
    dispatch(messagesActions.deleteMessage(messageId));
  };

  useEffect(() => {
    if (params.userId && currentMessagesPage > 1) {
      const userId = Number(params.userId);
      dispatch(
        messagesActions.fetchMessages({ userId, page: currentMessagesPage }),
      ).then(() => {
        scrollMessagesToPreviousPosition();
      });
    }
  }, [currentMessagesPage]);

  let getMessagesWrapperRef = useCallback((node: HTMLDivElement) => {
    listRef(node);
    messagesWrapperRef.current = node;
  }, []);

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } =
      messagesWrapperRef.current as HTMLDivElement;

    if (scrollTop === 0) {
      setCurrentMessagesPage((prev) => prev + 1);
      setScrollHeight(scrollHeight);
    }
  };

  const checkSenderIdWithCurrentUser = (arg: {
    senderId: number;
    variant: "avatarSrc" | "message";
  }): boolean | string | null => {
    let result;
    switch (arg.variant) {
      case "avatarSrc": {
        result =
          arg.senderId === currentUser.userId ? currentUser.photos.small : null;
        break;
      }
      case "message": {
        result = arg.senderId === currentUser.userId;
        break;
      }
    }

    return result;
  };

  return {
    handleScroll,
    getMessagesWrapperRef,
    onSubmitMessageForm,
    onDeleteBtn,
    messages,
    messagesCount,
    status,
    checkSenderIdWithCurrentUser,
  };
};
