import React from "react";
import s from "./NavBar.module.css";
import {NavLink} from "react-router-dom";

export const NavBar = () => {
  return (
    <div className={s.wrapperNavAside}>
      <nav className={s.navBar}>
        <NavLink to="/profile" className={({isActive}) => isActive ? s.activeLink : ''}>Profile</NavLink>
        <NavLink to="/dialogs" className={({isActive}) => isActive ? s.activeLink : ''}>Message</NavLink>
        <NavLink to="/news" className={({isActive}) => isActive ? s.activeLink : ''}>News</NavLink>
        <NavLink to="/music" className={({isActive}) => isActive ? s.activeLink : ''}>Music</NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? s.activeLink : ''}>Settings</NavLink>
      </nav>
      <aside className={s.aside}>
        <h2 className={s.asideTitle}>Friends</h2>
        <ul className={s.friendsList}>
          <li>Sveta</li>
          <li>Sasha</li>
          <li>Valera</li>
        </ul>
      </aside>
    </div>

  )
}