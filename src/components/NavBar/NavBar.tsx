import React from "react";
import s from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {SideBar} from "../SideBar/SideBar";

type NavBarPropsType = {
  sideBar: {
    friends: Array<{name: string}>
  }
}

export const NavBar = (props: NavBarPropsType) => {
  return (
    <div className={s.wrapperNavAside}>
      <nav className={s.navBar}>
        <NavLink to="/profile" className={({isActive}) => isActive ? s.activeLink : ''}>Profile</NavLink>
        <NavLink to="/dialogs" className={({isActive}) => isActive ? s.activeLink : ''}>Message</NavLink>
        <NavLink to="/news" className={({isActive}) => isActive ? s.activeLink : ''}>News</NavLink>
        <NavLink to="/music" className={({isActive}) => isActive ? s.activeLink : ''}>Music</NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? s.activeLink : ''}>Settings</NavLink>
      </nav>
      <SideBar sideBar={props.sideBar}/>
    </div>

  )
}