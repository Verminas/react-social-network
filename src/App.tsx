import React from 'react';
import logo from './logo.svg';
import './App.css';

type ComponentPropsType = {
  className: string
}

function App() {
  return (
    <div className="app-wrapper">
      <Header className={'header'}/>
      <NavBar className={'navBar'}/>
      <Profile className={'profile'}/>
    </div>
  );
}

export default App;

const Header = (props: ComponentPropsType) => {
  return (
    <div className={'header'}>
      <img className={'header__logo'} src="https://cdn.icon-icons.com/icons2/838/PNG/512/circle-dribble_icon-icons.com_66836.png" alt="logo"/>
    </div>
  )
}

const NavBar = (props: ComponentPropsType) => {
  return (
    <nav className={'navBar'}>
      <a href="#">Profile</a>
      <a href="#">Message</a>
      <a href="#">News</a>
      <a href="#">Music</a>
      <a href="#">Settings</a>
    </nav>
  )
}

const Profile = (props: ComponentPropsType) => {
  return (
    <section className={'profile'}>
      <img className={'profile__backImg'} src="https://kalix.club/uploads/posts/2022-12/1671644344_kalix-club-p-fon-sotsseti-pinterest-5.jpg" alt="profile-background"/>
      <div className={'profile__content'}>
        <img className={'profile__img'} src="https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg" alt="profile-logo"/>
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
            <textarea className={'profile__myPosts__textarea'} name="textarea" id="1" placeholder={'your news...'}></textarea>
            <button className={'profile__myPosts__button'} type={"submit"}>Send</button>
          </div>
          <div className={'profile__posts_items'}>
            <div className={'profile__posts_item'}>
              <img className={'profile__posts_itemImg'} src="https://www.purina.ru/sites/default/files/2022-10/1140_shutterstock_1517123654.jpg" alt="profile-logo-post"/>
              <p>Hey, why nobody love me?</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
