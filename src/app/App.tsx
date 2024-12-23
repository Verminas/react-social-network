import React, { createContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAppDispatch } from "./store";
import { selectAppIsInitialized } from "app/appSlice";
import Spinner from "common/components/Spinner/Spinner";
import { authActions } from "features/Auth/model/authSlice";
import { ErrorSnack } from "common/components/ErrorSnack/ErrorSnack";
import { S } from "./App.styles";
import { Header } from "common/components/Header/Header";
import { theme } from "common/styles/theme";

export const MenuContext = createContext({ collapsed: true });

export function App() {
  const [collapsed, setCollapsed] = useState(true);
  const dispatch = useAppDispatch();
  const isInitialized = useSelector(selectAppIsInitialized);

  const changeCollapsed = () => {
    setCollapsed(!collapsed)
  }

  useEffect(() => {
    dispatch(authActions.initializeApp());

    const isTabletWidth = window.innerWidth <= theme.media.tabletTs
    setCollapsed(isTabletWidth)
  }, []);

  if (!isInitialized) {
    return <Spinner />;
  }

  return (
      <MenuContext.Provider value={{ collapsed }}>
        <S.StyledLayout>
          <Header changeCollapsed={changeCollapsed}/>
          <ErrorSnack />
          <Outlet />
        </S.StyledLayout>
      </MenuContext.Provider>
  );
}

export default App;
