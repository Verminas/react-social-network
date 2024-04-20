import React from "react";
import "./Header.css";

type HeaderPropsType = {
  className: string
}
export const Header = (props: HeaderPropsType) => {
  return (
    <header className={'header'}>
      <img className={'header__logo'}
           src="https://cdn.icon-icons.com/icons2/838/PNG/512/circle-dribble_icon-icons.com_66836.png" alt="logo"/>
    </header>
  )
}