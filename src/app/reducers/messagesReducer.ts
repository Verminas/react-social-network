import {MessageItemsType, MessageType, stateData} from "../../redux/stateData";
import {v1} from "uuid";
const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";

type MessagesReducerActionType = AddNewMessageActionType

export const addNewMessageAC = (userId: number, message: string) => ({
  type: ADD_NEW_MESSAGE,
  payload: {
    userId,
    message
  }
})

type AddNewMessageActionType = ReturnType<typeof addNewMessageAC>

const initialState: MessageItemsType = {
    [1]: [
      {
        userID: 21987,
        messageID: v1(),
        message: 'FirstMessage',
        name: 'ProfileName',
        avatarSrc: ' ',
      },
      {
        userID: 2,
        messageID: v1(),
        message: ' DmitryName Secondt Message',
        name: 'DmitryName',
        avatarSrc: ' ',
      },
    ],
    [2]: [
      {
        userID: 4,
        messageID: v1(),
        message: 'FirstMessage',
        name: 'ProfileName',
        avatarSrc: ' ',
      },
      {
        userID: 6,
        messageID: v1(),
        message: 'SvetaName Secondt Message',
        name: 'SvetaName',
        avatarSrc: ' ',
      },
    ],
    [7]: [
      {
        userID: 9,
        messageID: v1(),
        message: 'FirstMessage',
        name: 'ProfileName',
        avatarSrc: ' ',
      },
      {
        userID: 5,
        messageID: v1(),
        message: 'ValeraName Secondt Message',
        name: 'ValeraName',
        avatarSrc: ' ',
      },
    ],
  }

export const messagesReducer = (state: MessageItemsType = initialState, action: MessagesReducerActionType) : MessageItemsType => {
  switch (action.type) {
    case ADD_NEW_MESSAGE: {
      const {userId, message} = action.payload;
      const newMessage :MessageType = {
        userID: 90,
        messageID: v1(),
        name: 'my name',
        message,
        avatarSrc: 'not found'
      }
      return {...state, [userId]: [...state[userId], newMessage]};
    }
    default: return state;
  }
}