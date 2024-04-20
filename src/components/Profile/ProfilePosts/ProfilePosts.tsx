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
  return (
    <div className={s.postsItems}>
      <PostItem message={'hi, i would like to talk with someone'}/>
      <PostItem message={'hi, nice to meet you'}/>
      <PostItem message={'do you want to find friends'}/>
      <PostItem message={'yes, of course'}/>
    </div>
  )
}
