import s from "./DialogLink.module.css";
import {NavLink} from "react-router-dom";
import React from "react";
import {Avatar} from "../Avatar/Avatar";

type DialogItemProps = {
  name: string,
  id: string
  src?: string
}
export const DialogLink = (props: DialogItemProps) => {
  let dialogPath = `/dialogs/${props.id}`;
  return (
    <li>
      <Avatar/>
      <NavLink to={dialogPath} className={s.dialog}>{props.name}</NavLink>
    </li>
  )
}