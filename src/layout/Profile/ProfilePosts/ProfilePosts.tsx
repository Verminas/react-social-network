import s from "./ProfilePosts.module.css";
import React, {useRef} from "react";
import {PostItem} from "../ProfilePost/ProfilePost";
import {MessageSubmitForm} from "../../../components/MessageSubmitForm/MessageSubmitForm";
import {MessageItem} from "../../../components/MessageItem/MessageItem";
import {MessageType, myUser} from "../../../redux/stateData";


type ProfilePostsPropsType = {
  posts: MessageType[]
  addNewPost: (message: string) => void
}

export const ProfilePosts = ({posts, addNewPost}: ProfilePostsPropsType) => {
  return (
    <div className={s.posts}>
      <MyPost addNewPost={addNewPost}/>
      <PostItems postItemsData={posts}/>
    </div>
  )
}
const MyPost = ({addNewPost}: {addNewPost: (message: string) => void}) => {

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
}

const PostItems = ({postItemsData}: PostItemsPropsType) => {

  const postItemsElements = postItemsData.map(i => <MessageItem message={i.message}
                                                                key={i.messageID}
                                                                id={i.messageID}
                                                                name={i.name}
                                                                avatarSrc={i.avatarSrc}
                                                                isMyMessage={i.userID === myUser.id}
  />);

  return (
    <div className={s.postsItems}>
      {postItemsElements}
    </div>
  )
}
