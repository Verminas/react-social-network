import s from "./BackImg.module.css";
import React from "react";

type Props = {
  src?: string | null
}

export const BackImg = ({src}: Props) => {
  return (
    <img className={s.backImg}
         src={src ? src : "https://kalix.club/uploads/posts/2022-12/1671644344_kalix-club-p-fon-sotsseti-pinterest-5.jpg"}
         alt="image background"/>
  )
}