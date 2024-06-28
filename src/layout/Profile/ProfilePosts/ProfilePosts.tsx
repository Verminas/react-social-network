import s from "./ProfilePosts.module.css";
import React, {useRef} from "react";
import {PostItem} from "../ProfilePost/ProfilePost";
import {MessageSubmitForm} from "../../../components/MessageSubmitForm/MessageSubmitForm";
import {MessageItem} from "../../../components/MessageItem/MessageItem";
import {MessageType} from "../../../redux/stateData";


type ProfilePostsPropsType = {
  postItemsData: MessageType[]
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
  let postTextArea = useRef<HTMLTextAreaElement>(null);
  let sendMyPost = () => {
    let textPostTextArea: string | undefined = postTextArea.current?.value;
    alert(textPostTextArea);
  }

  return (
    <div className={s.myPost}>
      <h2 className={s.myPostTitle}>My posts</h2>
      <MessageSubmitForm onClick={sendMyPost} refNode={postTextArea} placeholder={'your news...'}/>
    </div>
  )
}

type PostItemsPropsType = {
  postItemsData: MessageType[]
}

const PostItems = (props: PostItemsPropsType) => {

  const postItemsElements = props.postItemsData
    .map(i => <MessageItem message={i.message} key={i.id} id={i.id} />);

  return (
    <div className={s.postsItems}>
      {postItemsElements}
    </div>
  )
}
