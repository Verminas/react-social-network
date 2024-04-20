import React from "react";
import s from "./Profile.module.css";

// type ProfilePropsType = {
//   className: string
// }
export const Profile = () => {
  return (
    <section className={s.profile}>
      <img className={s.backImg}
           src="https://kalix.club/uploads/posts/2022-12/1671644344_kalix-club-p-fon-sotsseti-pinterest-5.jpg"
           alt="profile-background"/>
      <div className={s.content}>
        <img className={s.img}
             src="https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg"
             alt="profile-logo"/>
        <div className={s.info}>
          <h2>Dmitry K.</h2>
          <ul>
            <li>Date of Birth: <span>2 january</span></li>
            <li>City: <span>Minsk</span></li>
            <li>Education: <span>BSU'11</span></li>
            <li>Web-Site: <span>https: //it-kamasutra.com</span></li>
          </ul>
        </div>
        <div className={s.posts}>
          <div className={s.myPost}>
            <h2 className={s.myPostTitle}>My posts</h2>
            <textarea className={s.myPostTextarea} name="textarea" id="1"
                      placeholder={'your news...'}></textarea>
            <button className={s.myPostButton} type={"submit"}>Send</button>
          </div>
          <div className={s.postsItems}>
            <div className={s.postsItem}>
              <img className={s.postsItemImg}
                   src="https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg"
                   alt="profile-logo-post"/>
              <p>Hey, why nobody love me?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}