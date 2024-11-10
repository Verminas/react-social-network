import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../ui/Layout/Profile/Profile";
import { useAppDispatch } from "../../../app/store";
import { useSelector } from "react-redux";
import { postsActions, selectPosts } from "../model/postsSlice";

export const usePosts = () => {
  const [listRef] = useAutoAnimate<HTMLUnknownElement>();
  const [userId, setUserId] = useState("");

  const params = useParams<{ userId: string }>();
  const { isAuthUser, user } = useContext(UserContext);
  const dispatch = useAppDispatch();
  const posts = useSelector(selectPosts);

  useEffect(() => {
    const userId = params.userId ? params.userId : "";
    setUserId(userId);
    dispatch(postsActions.fetchPosts(userId));

    return () => {
      dispatch(postsActions.clearData());
    };
  }, [params]);

  const onClickHandler = (text: string) => {
    dispatch(postsActions.addPost({ text, currentUserId: userId }));
  };

  const onDeletePost = ({ messageId, senderId }: { messageId: string, senderId: number }) => {
    dispatch(postsActions.deletePost({ messageId, userId }));
  };

  return { posts, isAuthUser, onClickHandler, listRef, userId, onDeletePost };
};