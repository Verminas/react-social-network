import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../app/App";
import { stateData } from "../redux/stateData";
import React from "react";
import { Login } from "../features/Login/Login";
import { SocialNetwork } from "../features/SocialNetwork/SocialNetwork";
import { ErrorPage } from "../layout/ErrorPage/ErrorPage";
import { Profile } from "../components/Profile/Profile";
import { UserProfile } from "../components/UserProfile/UserProfile";
import { FindUsers } from "../layout/FindUsers/FindUsers";
import { Dialogs } from "../layout/Dialogs/Dialogs";
import { News } from "../layout/News/News";
import { Music } from "../layout/Music/Music";
import { Settings } from "../layout/Settings/Settings";

export const PATH = {
  COMMON: "/",
  ERROR: "/error",
  LOGIN: "/login",
  PROFILE_USER: "/profile/:userId",
  PROFILE: "/profile",
  USERS: "/users",
  DIALOGS: "/dialogs",
  DIALOG_USER: "/dialogs/:userId",
  NEWS: "/news",
  MUSIC: "/music",
  SETTINGS: "/settings",
};

const socialNetworkRoutes = [
  {
    index: true,
    element: <Navigate to={PATH.PROFILE_USER} />,
  },
  {
    path: PATH.PROFILE_USER,
    element: <UserProfile />,
  },
  {
    path: PATH.USERS,
    element: <FindUsers />,
  },
  {
    path: PATH.DIALOGS,
    element: <Dialogs dialogs={stateData.dialogsData} userID={1} />,
  },
  {
    path: PATH.NEWS,
    element: <News />,
  },
  {
    path: PATH.MUSIC,
    element: <Music />,
  },
  {
    path: PATH.SETTINGS,
    element: <Settings />,
  },
];

export const router = createBrowserRouter([
  {
    path: PATH.COMMON,
    element: <App />,
    errorElement: <Navigate to={PATH.ERROR} />,
    children: [
      {
        path: PATH.COMMON,
        element: <SocialNetwork />,
        children: [...socialNetworkRoutes],
      },
      {
        path: PATH.LOGIN,
        element: <Login />,
      },
      {
        path: PATH.ERROR,
        element: <ErrorPage />,
      },
    ],
  },
]);
