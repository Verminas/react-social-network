import {MessageItemsType, MessageType, stateData} from "../redux/stateData";
import {v1} from "uuid";

const ADD_NEW_POST = "ADD_NEW_POST";

type PostsReducerActionTypes = MessagesReducerActionType

export const addNewPostAC = (post: string) => ({
  type: ADD_NEW_POST,
  payload: {
    post
  }
})

type MessagesReducerActionType = ReturnType<typeof addNewPostAC>

const initialState: MessageType[] = [
  {
    userID: 5678,
    messageID: v1(),
    message: 'FirstMessage',
    name: 'ProfileName',
    avatarSrc: 'https://img.freepik.com/premium-vector/man-character_665280-46970.jpg',
  },
  {
    userID: 45678,
    messageID: v1(),
    message: 'SecondMessage',
    name: 'NoProfileName',
    avatarSrc: 'data:image/jpeg;base64,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',
  },
]

export const postsReducer = (state: MessageType[] = initialState, action: PostsReducerActionTypes) : MessageType[] => {
  switch (action.type) {
    case ADD_NEW_POST: {
      const {post} = action.payload;
      const newPost :MessageType = {
        userID: 567,
        messageID: v1(),
        name: 'My name',
        message: post,
        avatarSrc: 'not found'
      }
      return [newPost, ...state];
    }
    default: return state;
  }
}