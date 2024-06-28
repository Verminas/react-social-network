import s from "./DialogLink.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {Avatar} from "../Avatar/Avatar";

type DialogItemProps = {
  name: string,
  id: string
  src?: string
  onClick: (id: string) => void
}
export const DialogLink = ({src, id, name, onClick}: DialogItemProps) => {
  const dialogPath = `/dialogs/${id}`;
  const onClickHandler = () => {
    onClick(id);
  }
  return (
    <li onClick={onClickHandler}>
      <Avatar src={src}/>
      <NavLink to={dialogPath} className={s.dialog}>{name}</NavLink>
    </li>
  )
}