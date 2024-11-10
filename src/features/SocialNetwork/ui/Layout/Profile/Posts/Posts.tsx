import { SubmitForm } from "common/components/SubmitForm/SubmitForm";
import { S } from "./Posts.styles";
import { PostItem } from "./PostItem/PostItem";
import { usePosts } from "../../../../lib/usePosts";

export const Posts = () => {
  const { posts, isAuthUser, userId, onClickHandler, listRef, onDeletePost } = usePosts();

  const postsElements = posts.map(p => <PostItem post={p} isMyPost={p.senderId === +userId} onClick={onDeletePost}
                                                 key={p.messageId} />);

  return (
    <S.Wrapper>
      <S.Form>
        <S.Title>{isAuthUser ? "My posts" : "Posts"}</S.Title>
        <SubmitForm
          onSubmitForm={onClickHandler}
          placeholder={"your news..."}
        />
      </S.Form>
      <S.Posts ref={listRef}>{postsElements}</S.Posts>
    </S.Wrapper>
  );
};
