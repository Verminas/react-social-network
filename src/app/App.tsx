import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";
import { selectAppIsInitialized } from "app/appSlice";
import Spinner from "common/components/Spinner/Spinner";
import { authActions } from "features/Auth/model/authSlice";
import { ErrorSnack } from "common/components/ErrorSnack/ErrorSnack";
import { useWindowWidthResize } from "common/hooks/useWindowWidthResize";
import { S } from "./App.styles";
import { Header } from "common/components/Header/Header";


export const MenuContext = createContext({ collapsed: false });
export const WindowWidthContext = createContext({
  width: 0,
  isTabletWidth: false
});

export const DEVICES_WIDTH = {
  TABLET: 768
};

export function App() {
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectAppIsInitialized);

  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

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
          <Header changeCollapsed={changeCollapsed}/>
          <ErrorSnack />
          <Outlet />
        </S.StyledLayout>
      </MenuContext.Provider>
    </WindowWidthContext.Provider>
  );
}

export default App;
