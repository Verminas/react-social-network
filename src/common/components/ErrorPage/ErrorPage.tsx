import { useNavigate } from "react-router-dom";
import { PATH } from "common/router/router";
import { S } from "common/components/ErrorPage/ErrorPage.styles";


export const ErrorPage = () => {
  const navigate = useNavigate();

  const onGoHomePage = () => {
    navigate(PATH.COMMON)
  }

  return (
    <S.Wrapper>
      <S.Text>404 | Not Found</S.Text>
      <S.Button onClick={onGoHomePage}>Go to Home Page</S.Button>
    </S.Wrapper>
  );
};