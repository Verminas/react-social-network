import React from "react";
import s from "./Dialogs.module.css";
import { DialogItemType } from "../../redux/stateData";

type messagesPageStatePropsType = {
  dialogs: DialogItemType[];
  userID: number;
};

export const Dialogs = ({ dialogs, userID }: messagesPageStatePropsType) => {
  return <section className={s.dialogs}>dialogs</section>;
};
