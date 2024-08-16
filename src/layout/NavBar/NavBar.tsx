import React from "react";
import s from "./NavBar.module.css";
import {SideBar} from "../SideBar/SideBar";
import {PageLink} from "../../components/PageLink/PageLink";
import {FriendItemType} from "../../redux/stateData";
import {useSelector} from "react-redux";
import {selectCurrentUser} from "../../app/selectors";

type NavBarPropsType = {
  sideBar: FriendItemType[]
}

export type PageItemType = {
  title: string
  path: string
}
type PagesDataType = PageItemType[]


export const NavBar = ({sideBar}: NavBarPropsType) => {
  const currentUser = useSelector(selectCurrentUser)
  const pagesData: PagesDataType = [
    {
      title: 'Profile',
      path: `/profile/${currentUser.userId}`,
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
    },
    {
      title: 'Find Users',
      path: '/users',
    }
  ]

  const pagesLinks = pagesData.map(i => <PageLink data={i} key={i.title} />)

  return (
    <div className={s.wrapperNavAside}>
      <nav className={s.navBar}>
        {pagesLinks}
      </nav>
      <SideBar sideBar={sideBar}/>
    </div>
  )
}