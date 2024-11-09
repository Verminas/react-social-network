import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { PATH } from "common/router/router";
import { selectCurrentUser } from "features/SocialNetwork/model/currentUserSlice";
import { selectIsLoggedIn } from "features/Auth/model/authSlice";
import { Layout } from "antd";
import { Navigation } from "features/SocialNetwork/ui/Navigation/Navigation";
import { S } from "./SocialNetwork.styles";
import { MenuContext } from "../../../app/App";

export const SocialNetwork = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);
  const menuCollapsed = useContext(MenuContext);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    if (currentUser.userId) {
      navigate(`${PATH.PROFILE}/${currentUser.userId}`);
    }
  }, [currentUser.userId]);


  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <Layout>
      <Navigation />
      <S.StyledContent menucollapsed={menuCollapsed.collapsed.toString()}>
        <Outlet />
      </S.StyledContent>
    </Layout>
  );
};
