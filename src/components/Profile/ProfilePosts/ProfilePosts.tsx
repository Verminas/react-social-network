import s from "./ProfilePosts.module.css";
import React, {useRef} from "react";
import {PostItem} from "../ProfilePost/ProfilePost";
import {MessageSubmitForm} from "../../MessageSubmitForm/MessageSubmitForm";
import {MessageItem} from "../../MessageItem/MessageItem";
import {MessageType} from "../../../redux/stateData";


type ProfilePostsPropsType = {
  posts: MessageType[]
  addNewPost: (message: string) => void
  userID: number
}

export const ProfilePosts = ({posts, addNewPost, userID}: ProfilePostsPropsType) => {
  return (
    <div className={s.posts}>
      <MyPost addNewPost={addNewPost}/>
      <PostItems postItemsData={posts} userID={userID}/>
    </div>
  )
}
const MyPost = ({addNewPost}: { addNewPost: (message: string) => void }) => {

  const onClickHandler = (value: string) => {
    addNewPost(value)
  }

  return (
    <div className={s.myPost}>
      <h2 className={s.myPostTitle}>My posts</h2>
      <MessageSubmitForm onClick={onClickHandler} placeholder={'your news...'}/>
    </div>
  )
}

type PostItemsPropsType = {
  postItemsData: MessageType[]
  userID: number
}

const PostItems = ({postItemsData, userID}: PostItemsPropsType) => {

  const postItemsElements = postItemsData.map(i => <MessageItem message={i.message}
                                                                key={i.messageID}
                                                                id={i.messageID}
                                                                name={i.name}
                                                                avatarSrc={i.avatarSrc}
                                                                isMyMessage={i.userID === userID}
  />);

  return (
    <div className={s.postsItems}>
      {postItemsData.length > 0
        ? postItemsElements
        :<div></div>
      }
    </div>
  )
}