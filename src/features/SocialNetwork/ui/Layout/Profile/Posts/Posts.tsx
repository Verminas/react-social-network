import { useContext } from "react";
import { SubmitForm } from "common/components/SubmitForm/SubmitForm";
import { UserContext } from "features/SocialNetwork/ui/Layout/Profile/Profile";
import {S} from "./Posts.styles"

export const Posts = () => {
  const {isAuthUser } = useContext(UserContext);
  const onClickHandler = (value: string) => {
    alert(value);
  };

  return (
    <S.Wrapper>
      <S.Form>
        <S.Title>{isAuthUser ? "My posts" : "Posts"}</S.Title>
        <SubmitForm
          onSubmitForm={onClickHandler}
          placeholder={"your news..."}
        />
      </S.Form>
      <S.Posts></S.Posts>
    </S.Wrapper>
  );
};
