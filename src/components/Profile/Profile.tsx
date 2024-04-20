import React from "react";

type ProfilePropsType = {
  className: string
}
export const Profile = (props: ProfilePropsType) => {
  return (
    <section className={'profile'}>
      <img className={'profile__backImg'}
           src="https://kalix.club/uploads/posts/2022-12/1671644344_kalix-club-p-fon-sotsseti-pinterest-5.jpg"
           alt="profile-background"/>
      <div className={'profile__content'}>
        <img className={'profile__img'}
             src="https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg"
             alt="profile-logo"/>
        <div className={'profile__info'}>
          <h2>Dmitry K.</h2>
          <ul>
            <li>Date of Birth: <span>2 january</span></li>
            <li>City: <span>Minsk</span></li>
            <li>Education: <span>BSU'11</span></li>
            <li>Web-Site: <span>https: //it-kamasutra.com</span></li>
          </ul>
        </div>
        <div className={'profile__posts'}>
          <div className={'profile__myPost'}>
            <h2 className={'profile__myPost___title'}>My posts</h2>
            <textarea className={'profile__myPosts__textarea'} name="textarea" id="1"
                      placeholder={'your news...'}></textarea>
            <button className={'profile__myPosts__button'} type={"submit"}>Send</button>
          </div>
          <div className={'profile__posts_items'}>
            <div className={'profile__posts_item'}>
              <img className={'profile__posts_itemImg'}
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