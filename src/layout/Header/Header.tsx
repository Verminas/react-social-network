import React from "react";
import s from "./Header.module.css";
import {useSelector} from "react-redux";
import {selectAppState} from "../../app/selectors";
import {socialAPI} from "../../api/socialAPI";
import {useNavigate, useNavigation} from "react-router-dom";
import {PATH} from "../../router/router";
import {isAuthorizedAppAC} from "../../app/reducers/appReducer";
import {useAppDispatch} from "../../app/store";

export const Header = () => {
  const app = useSelector(selectAppState)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const logOutHandler = () => {
    socialAPI.logOut()
      .then(res => {
        console.log(res)
        dispatch(isAuthorizedAppAC(false))
      })
  }
  return (
    <header className={s.header}>
      <img className={s.logo}
           src="https://cdn.icon-icons.com/icons2/838/PNG/512/circle-dribble_icon-icons.com_66836.png" alt="logo"/>
      {app.status === 'loading' ? <span className={s.loading}>Loading...</span> : null}
      {app.isAuthorized ? <button onClick={logOutHandler}>Log out</button> : null}
    </header>
  )
}