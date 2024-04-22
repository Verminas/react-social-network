import s from "./ProfilePosts.module.css";
import React from "react";
import {PostItem} from "../ProfilePost/ProfilePost";

export const ProfilePosts = () => {
  return (
    <div className={s.posts}>
      <MyPost/>
      <PostItems/>
    </div>
  )
}
const MyPost = () => {
  return (
    <div className={s.myPost}>
      <h2 className={s.myPostTitle}>My posts</h2>
      <textarea className={s.myPostTextarea} name="textarea" id="1"
                placeholder={'your news...'}></textarea>
      <button className={s.myPostButton} type={"submit"}>Send</button>
    </div>
  )
}
const PostItems = () => {

  const postItemsData = [
    {
      id: '1',
      postMessage: 'hi, i would like to talk with someone',
    },
    {
      id: '2',
      postMessage: 'hi, nice to meet you',
    },
    {
      id: '3',
      postMessage: 'do you want to find friends',
    },
    {
      id: '4',
      postMessage: 'yes, of course',
    },
  ];

  let postItemsElements = postItemsData
    .map(i => <PostItem message={i.postMessage} />);

  return (
    <div className={s.postsItems}>
      {postItemsElements}
    </div>
  )
}
