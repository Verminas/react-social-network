import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";
import { selectAppIsInitialized } from "app/appSlice";
import Spinner from "common/components/Spinner/Spinner";
import { authActions, selectIsLoggedIn } from "features/Auth/model/authSlice";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined
} from "@ant-design/icons";
import { ErrorSnack } from "common/components/ErrorSnack/ErrorSnack";
import { useWindowWidthResize } from "common/hooks/useWindowWidthResize";
import logo from "assets/network.webp";
import { ProgressBar } from "common/components/ProgressBar/ProgressBar";
import { S } from "./App.styles";


export const MenuContext = createContext({ collapsed: false });
export const WindowWidthContext = createContext({
  width: 0,
  isTabletWidth: false
});

export const DEVICES_WIDTH = {
  TABLET: 768
};

export function App() {
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectAppIsInitialized);
  const isLoggedIn = useSelector(selectIsLoggedIn);

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
        isTabletWidth: windowWidth <= DEVICES_WIDTH.TABLET
      }}
    >
      <MenuContext.Provider value={{ collapsed }}>
        <S.StyledLayout>
          <S.StyledHeader>
            <S.LogoButtonWrapper>
              <S.Logo src={logo} alt="social logo" />
              <S.CollapsedButton
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                isloggedin={isLoggedIn.toString()}
                onClick={() => setCollapsed(!collapsed)} />
            </S.LogoButtonWrapper>

            <S.LogOutButton
              type="text"
              icon={<LogoutOutlined />}
              onClick={logOutHandler}
              isloggedin={isLoggedIn.toString()}
            >
              Log out
            </S.LogOutButton>

            <ProgressBar />
          </S.StyledHeader>

          <ErrorSnack />

          <Outlet />

        </S.StyledLayout>
      </MenuContext.Provider>
    </WindowWidthContext.Provider>
  );
}

export default App;
