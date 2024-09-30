import s from "./DialogLink.module.css";
import { NavLink } from "react-router-dom";
import React from "react";
import { Avatar } from "../Avatar/Avatar";

type DialogItemProps = {
  name: string;
  id: string;
  src?: string;
};
export const DialogLink = ({ src, id, name }: DialogItemProps) => {
  const dialogPath = `/dialogs/${id}`;

  return (
    <li>
      <Avatar src={src} />
      <NavLink
        to={dialogPath}
        className={({ isActive }) => (isActive ? s.activeLink : "")}
      >
        {name}
      </NavLink>
    </li>
  );
};
