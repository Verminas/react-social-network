import React from "react";
import s from './Dialogs.module.css';
import {NavLink} from "react-router-dom";

export const Dialogs = () => {
  return (
    <section className={s.dialogs}>
      <div className={s.dialogsItems}>
        <h2 className={s.title}>Dialogs</h2>
        <ul>
          <li><NavLink to="/dialogs/1" className={s.dialog}>Dmitry</NavLink></li>
          <li><NavLink to="/dialogs/2" className={s.dialog}>Sveta</NavLink></li>
          <li><NavLink to="/dialogs/3" className={s.dialog}>Valera</NavLink></li>
          <li><NavLink to="/dialogs/4" className={s.dialog}>Alex</NavLink></li>
          <li><NavLink to="/dialogs/5" className={s.dialog}>Natali</NavLink></li>
        </ul>
      </div>
      <div className={s.messages}>
        <p className={s.message}>Hello</p>
        <p className={s.message}>How are you</p>
        <p className={s.message}>I'm fine</p>
      </div>
    </section>
  )
}