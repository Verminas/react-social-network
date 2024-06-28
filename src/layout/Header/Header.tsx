import React from "react";
import s from "./Header.module.css";

export const Header = () => {
  return (
    <header className={s.header}>
      <img className={s.logo}
           src="https://cdn.icon-icons.com/icons2/838/PNG/512/circle-dribble_icon-icons.com_66836.png" alt="logo"/>
    </header>
  )
}