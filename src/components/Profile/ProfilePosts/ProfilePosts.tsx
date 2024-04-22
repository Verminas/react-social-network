import s from "./ProfilePosts.module.css";
import React from "react";
import {PostItem} from "../ProfilePost/ProfilePost";
import {postItemsData} from "../../../index";

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

  let postItemsElements = postItemsData
    .map(i => <PostItem message={i.postMessage} />);

  return (
    <div className={s.postsItems}>
      {postItemsElements}
    </div>
  )
}
