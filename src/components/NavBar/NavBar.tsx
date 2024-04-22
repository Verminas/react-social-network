import React from "react";
import s from "./NavBar.module.css";

export const NavBar = () => {
  return (
    <nav className={s.navBar}>
      <a href="/profile">Profile</a>
      <a href="/dialogs">Message</a>
      <a href="/news">News</a>
      <a href="/music">Music</a>
      <a href="/settings">Settings</a>
    </nav>
  )
}