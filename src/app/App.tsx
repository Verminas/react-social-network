import React, { createContext, useEffect, useState } from "react";
import "./App.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";
import { selectAppIsInitialized, selectAppStatus } from "app/appSlice";
import Spinner from "common/components/Spinner/Spinner";
import { authActions, selectIsLoggedIn } from "features/Auth/model/authSlice";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Button, Layout, theme, Progress } from "antd";
import { ErrorSnack } from "common/components/ErrorSnack/ErrorSnack";
import { useWindowWidthResize } from "common/hooks/useWindowWidthResize";

const { Header } = Layout;

export const MenuContext = createContext({ collapsed: false });
export const WindowWidthContext = createContext({
  width: 0,
  isTabletWidth: false,
});

export const DEVICES_WIDTH = {
  TABLET: 768,
};

export function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectAppIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const status = useSelector(selectAppStatus);

  const changeCollapsedWithWidth = () => {
    if (windowWidth <= DEVICES_WIDTH.TABLET) {
      setCollapsed(true);
    } else {
      setCollapsed(false);
    }
  };

  const { windowWidth } = useWindowWidthResize(changeCollapsedWithWidth);

  useEffect(() => {
    dispatch(authActions.initializeApp());
  }, []);

  // antd
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const logOutHandler = () => {
    dispatch(authActions.logOut());
  };

  if (!isInitialized) {
    return <Spinner />;
  }

  return (
    <WindowWidthContext.Provider
      value={{
        width: windowWidth,
        isTabletWidth: windowWidth <= DEVICES_WIDTH.TABLET,
      }}
    >
      <MenuContext.Provider value={{ collapsed }}>
        <div style={{ backgroundColor: "#f5f5f5" }}>
          <div
            style={{
              maxWidth: "1280px",
              margin: "0 auto",
              overflowX: "hidden",
            }}
          >
            <Layout style={{ minHeight: "100vh" }}>
              <Header
                style={{
                  padding: 0,
                  background: colorBgContainer,
                  display: "flex",
                  justifyContent:
                    windowWidth > DEVICES_WIDTH.TABLET
                      ? "space-between"
                      : "flex-end",
                  position: "relative",
                }}
              >
                {windowWidth > DEVICES_WIDTH.TABLET ? (
                  <Button
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                ) : (
                  ""
                )}

                {isLoggedIn ? (
                  <Button
                    type="text"
                    icon={<LogoutOutlined />}
                    onClick={logOutHandler}
                    style={{
                      fontSize: "16px",
                      height: 64,
                    }}
                  >
                    Log out
                  </Button>
                ) : (
                  ""
                )}

                {status === "loading" && (
                  <Progress
                    percent={100}
                    showInfo={false}
                    style={{
                      position: "absolute",
                      bottom: 0,
                      right: 0,
                      width: "100%",
                      lineHeight: 0,
                    }}
                    strokeLinecap={"square"}
                    size={"small"}
                    status="active"
                    strokeColor={"rgba(22,119,255,0.5)"}
                  />
                )}
              </Header>

              <ErrorSnack />

              <Outlet />
            </Layout>
          </div>
        </div>
      </MenuContext.Provider>
    </WindowWidthContext.Provider>
  );
}

export default App;
