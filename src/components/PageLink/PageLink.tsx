import { NavLink } from "react-router-dom";
import s from "./PageLink.module.css";
import React from "react";
import {PageItemType} from "features/SocialNetwork/SocialNetwork";

type PageLinkPropsType = {
  data: PageItemType;
};
export const PageLink = ({ data: { path, title } }: PageLinkPropsType) => {
  return (
    <NavLink
      to={path}
      className={({ isActive }) => (isActive ? s.activeLink : "")}
    >
      {title}
    </NavLink>
  );
};
