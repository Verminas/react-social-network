import React from "react";
import s from "./NavBar.module.css";
import {NavLink} from "react-router-dom";
import {SideBar} from "../SideBar/SideBar";
import {PageLink} from "../../components/PageLink/PageLink";

type NavBarPropsType = {
  sideBar: {
    friends: Array<{name: string}>
  }
}

export type PageItemType = {
  title: string
  path: string
}
type PagesDataType = PageItemType[]

const pagesData: PagesDataType = [
  {
    title: 'Profile',
    path: '/profile',
  },
  {
    title: 'Message',
    path: '/dialogs',
  },
  {
    title: 'News',
    path: '/news',
  },
  {
    title: 'Music',
    path: '/music',
  },
  {
    title: 'Settings',
    path: '/settings',
  }
]

export const NavBar = (props: NavBarPropsType) => {
  const pagesLinks = pagesData.map(i => <PageLink data={i} key={i.title} />)
  return (
    <div className={s.wrapperNavAside}>
      <nav className={s.navBar}>
        {pagesLinks}
      </nav>
      <SideBar sideBar={props.sideBar}/>
    </div>
  )
}