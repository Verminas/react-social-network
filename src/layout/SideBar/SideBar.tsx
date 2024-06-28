import React from 'react';
import s from "./SideBar.module.css";
import {FriendItemType} from "../../redux/stateData";

type SideBarPropsType ={
  sideBar: FriendItemType[]
}

export const SideBar = ({sideBar}: SideBarPropsType) => {
  const friendsListElements = sideBar.map(f => <li key={f.id} id={f.id}>{f.name}</li>)
  return (
    <aside className={s.aside}>
      <h2 className={s.asideTitle}>Friends</h2>
      <ul className={s.friendsList}>
        {friendsListElements}
      </ul>
    </aside>
  );
};
