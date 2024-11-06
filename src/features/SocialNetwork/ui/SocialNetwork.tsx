import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { PATH } from "common/router/router";
import { selectCurrentUser } from "features/SocialNetwork/model/currentUserSlice";
import { selectIsLoggedIn } from "features/Auth/model/authSlice";
import { Layout, theme } from "antd";
import { Navigation } from "features/SocialNetwork/ui/Navigation/Navigation";

const { Content } = Layout;

export const SocialNetwork = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }

    if (currentUser.userId) {
      navigate(`${PATH.PROFILE}/${currentUser.userId}`);
    }
  }, [currentUser.userId]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <Layout>
      <Navigation />
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
          background: colorBgContainer,
          borderRadius: borderRadiusLG,
        }}
      >
        <Outlet />
      </Content>
    </Layout>
  );
};
