// @flow
import * as React from "react";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { PATH } from "common/router/router";
import {
  CommentOutlined,
  GlobalOutlined,
  SettingOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useContext } from "react";
import { MenuContext } from "app/App";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "features/SocialNetwork/model/currentUserSlice";

type Props = {};
export const Navigation = (props: Props) => {
  const navigate = useNavigate();
  const menuCollapsed = useContext(MenuContext);
  const currentUser = useSelector(selectCurrentUser);
  const location = useLocation();
  // todo: узнать костыль или нет ->
  const selectedMenuItem = location.pathname.includes(PATH.DIALOGS)
    ? PATH.DIALOGS
    : location.pathname;

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
        defaultSelectedKeys={[`${PATH.PROFILE}/${currentUser.userId}`]}
        selectedKeys={[selectedMenuItem]}
        items={menuItems}
        onClick={({ keyPath }) => navigate(keyPath[0])}
      />
    </Sider>
  );
};

export type PageItemType = {
  title: string;
  path: string;
  icon: React.ReactElement;
};
type NavigationDataType = PageItemType[];
