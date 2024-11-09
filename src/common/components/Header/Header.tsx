import {S} from "./Header.styles"
import logo from "../../../assets/network.webp";
import { LogoutOutlined, MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { ProgressBar } from "common/components/ProgressBar/ProgressBar";
import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { authActions, selectIsLoggedIn } from "../../../features/Auth/model/authSlice";
import { MenuContext } from "../../../app/App";
import { useAppDispatch } from "../../../app/store";

type Props = {
  changeCollapsed: () => void
};
export const Header = ({changeCollapsed}: Props) => {
  const menuCollapsed = useContext(MenuContext);
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const logOutHandler = () => {
    dispatch(authActions.logOut());
  };

  return (
    <S.StyledHeader>
      <S.LogoButtonWrapper>
        <S.Logo src={logo} alt="social logo" />
        <S.CollapsedButton
          type="text"
          icon={menuCollapsed.collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          isloggedin={isLoggedIn.toString()}
          onClick={changeCollapsed} />
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
  );
};