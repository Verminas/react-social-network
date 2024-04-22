import React from "react";
import s from './Dialogs.module.css';

export const Dialogs = () => {
  return (
    <section className={s.dialogs}>
      <div className={s.dialogsItems}>
        <h2 className={s.title}>Dialogs</h2>
        <ul>
          <li><a href="" className={s.dialog}>Dmitry</a></li>
          <li><a href="" className={s.dialog}>Sveta</a></li>
          <li><a href="" className={s.dialog}>Valera</a></li>
          <li><a href="" className={s.dialog}>Alex</a></li>
          <li><a href="" className={s.dialog}>Natali</a></li>
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