import React from "react";
import "./NavBar.css";

type NavBarPropsType = {
  className: string
}
export const NavBar = (props: NavBarPropsType) => {
  return (
    <nav className={'navBar'}>
      <a href="#">Profile</a>
      <a href="#">Message</a>
      <a href="#">News</a>
      <a href="#">Music</a>
      <a href="#">Settings</a>
    </nav>
  )
}