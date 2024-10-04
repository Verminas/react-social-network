import { Navigate, Outlet, useNavigate } from "react-router-dom";
import React, { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import { PATH } from "common/router/router";
import { selectCurrentUser } from "app/reducers/currentUserSlice";
import { selectIsLoggedIn } from "features/Auth/model/authSlice";

import {
  UserOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  CustomerServiceOutlined,
  CommentOutlined,
  GlobalOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { MenuContext } from "app/App";

const { Sider, Content } = Layout;

export type PageItemType = {
  title: string;
  path: string;
  icon: React.ReactElement;
};
type NavigationDataType = PageItemType[];

export const SocialNetwork = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const currentUser = useSelector(selectCurrentUser);

  useEffect(() => {
    if (currentUser.userId) {
      navigate(`${PATH.PROFILE}/${currentUser.userId}`);
    }
  }, [currentUser.userId]);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const menuCollapsed = useContext(MenuContext);

  if (!isLoggedIn) {
    return <Navigate to={PATH.LOGIN} />;
  }

  const navigationData: NavigationDataType = [
    {
      title: "Profile",
      path: `${PATH.PROFILE}/${currentUser.userId}`,
      icon: <UserOutlined />,
    },
    {
      title: "Message",
      path: PATH.DIALOGS,
      icon: <CommentOutlined />,
    },
    {
      title: "News",
      path: PATH.NEWS,
      icon: <GlobalOutlined />,
    },
    {
      title: "Music",
      path: PATH.MUSIC,
      icon: <CustomerServiceOutlined />,
    },
    {
      title: "Settings",
      path: PATH.SETTINGS,
      icon: <SettingOutlined />,
    },
    {
      title: "Find Users",
      path: PATH.USERS,
      icon: <UsergroupAddOutlined />,
    },
  ];

  const menuItems = navigationData.map((d) => ({
    label: d.title,
    key: d.path,
    icon: d.icon,
  }));

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={menuCollapsed.collapsed}
        style={{ width: "80%" }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menuItems}
          onClick={({ keyPath }) => navigate(keyPath[0])}
        />
      </Sider>

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
