import React from "react";
import s from "./Header.module.css";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {selectAppStatus} from "../../app/reducers/appSlice";
import {useAppDispatch} from "../../app/store";
import {authActions, selectIsLoggedIn} from "../../app/reducers/authSlice";

export const Header = () => {
  const status = useSelector(selectAppStatus)
  const isLoggedIn = useSelector(selectIsLoggedIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    dispatch(authActions.logOut())
  }
  return (
    <header className={s.header}>
      <img className={s.logo}
           src="https://cdn.icon-icons.com/icons2/838/PNG/512/circle-dribble_icon-icons.com_66836.png" alt="logo"/>
      {status === 'loading' ? <span className={s.loading}>Loading...</span> : null}
      {isLoggedIn ? <button onClick={logOutHandler}>Log out</button> : null}
    </header>
  )
}