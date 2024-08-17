import React from "react";
import s from "./Header.module.css";
import {useSelector} from "react-redux";
import {selectAppState} from "../../app/selectors";
import {authAPI, socialAPI} from "../../api/socialAPI";
import {Navigate, useNavigate, useNavigation} from "react-router-dom";
import {PATH} from "../../router/router";
import {isAuthorizedAppAC, isLoggedInAppAC} from "../../app/reducers/appReducer";
import {useAppDispatch} from "../../app/store";

export const Header = () => {
  const app = useSelector(selectAppState)
  const status = app.status;
  const isLoggedIn = app.isLoggedIn;
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    authAPI.logOut()
      .then(res => {
        console.log(res)
        // dispatch(isAuthorizedAppAC(false))
        dispatch(isLoggedInAppAC(false))
        // navigate(PATH.LOGIN)
      })
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