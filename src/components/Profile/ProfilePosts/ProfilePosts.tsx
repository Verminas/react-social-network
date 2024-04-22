import s from "./ProfilePosts.module.css";
import React from "react";
import {PostItem} from "../ProfilePost/ProfilePost";


type ProfilePostsPropsType = {
  postItemsData: Array<{
    id: string,
    postMessage: string,
  }>,
}

export const ProfilePosts = (props: ProfilePostsPropsType) => {
  return (
    <div className={s.posts}>
      <MyPost/>
      <PostItems postItemsData={props.postItemsData}/>
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

type PostItemsPropsType = {
  postItemsData: Array<{
    id: string,
    postMessage: string,
  }>,
}

const PostItems = (props: PostItemsPropsType) => {

  let postItemsElements = props.postItemsData
    .map(i => <PostItem message={i.postMessage} />);

  return (
    <div className={s.postsItems}>
      {postItemsElements}
    </div>
  )
}
