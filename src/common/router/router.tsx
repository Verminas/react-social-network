import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "app/App";
import React from "react";
import { Login } from "features/Auth/ui/Login";
import { SocialNetwork } from "features/SocialNetwork/ui/SocialNetwork";
import { ErrorPage } from "common/components/ErrorPage/ErrorPage";
import { Profile } from "features/SocialNetwork/ui/Layout/Profile/Profile";
import { FindUsers } from "features/SocialNetwork/ui/Layout/FindUsers/FindUsers";
import { Dialogs } from "features/SocialNetwork/ui/Layout/Dialogs/Dialogs";
import { News } from "features/SocialNetwork/ui/Layout/News/News";
import { Music } from "features/SocialNetwork/ui/Layout/Music/Music";
import { Settings } from "features/SocialNetwork/ui/Layout/Settings/Settings";
import { Messages } from "features/SocialNetwork/ui/Layout/Dialogs/Messages/Messages";

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
    element: <Profile />,
  },
  {
    path: PATH.USERS,
    element: <FindUsers />,
  },
  {
    path: PATH.DIALOGS,
    element: <Dialogs />,
  },
  {
    path: PATH.DIALOG_USER,
    element: <Messages />,
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
