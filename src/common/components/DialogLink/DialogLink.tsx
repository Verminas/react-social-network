import s from "common/components/DialogLink/DialogLink.module.css";
import { NavLink } from "react-router-dom";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";

type DialogItemProps = {
  name: string;
  id: string;
  src?: string;
};
export const DialogLink = ({ src, id, name }: DialogItemProps) => {
  const dialogPath = `/dialogs/${id}`;

  return (
    <li>
      <Avatar
        size={128}
        icon={<UserOutlined />}
        src={src || null}
        alt={"profile-photo"}
      />
      <NavLink
        to={dialogPath}
        className={({ isActive }) => (isActive ? s.activeLink : "")}
      >
        {name}
      </NavLink>
    </li>
  );
};
