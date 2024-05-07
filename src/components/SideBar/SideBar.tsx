import React from 'react';
import s from "./SideBar.module.css";

type SideBarPropsType ={
  sideBar: {
    friends: Array<{name: string}>
  }
}

export const SideBar = (props: SideBarPropsType) => {
  const friendsListElements = props.sideBar.friends.map((f, index) => {
    return (
      <li key={index}>{f.name}</li>
    )
  })
  return (
    <aside className={s.aside}>
      <h2 className={s.asideTitle}>Friends</h2>
      <ul className={s.friendsList}>
        {friendsListElements}
      </ul>
    </aside>
  );
};
