import {MessageItemsType, MessageType, stateData} from "../redux/stateData";
import {v1} from "uuid";
const {profileInfoData} = stateData;
const ADD_NEW_MESSAGE = "ADD_NEW_MESSAGE";

type MessagesReducerActionType = AddNewMessageActionType

export const addNewMessageAC = (userId: string, message: string) => ({
  type: ADD_NEW_MESSAGE,
  payload: {
    userId,
    message
  }
})

type AddNewMessageActionType = ReturnType<typeof addNewMessageAC>

const initialState: MessageItemsType = {
    ['1']: [
      {
        userID: '0',
        messageID: v1(),
        message: 'FirstMessage',
        name: 'ProfileName',
        avatarSrc: ' ',
      },
      {
        userID: '1',
        messageID: v1(),
        message: ' DmitryName Secondt Message',
        name: 'DmitryName',
        avatarSrc: ' ',
      },
    ],
    ['2']: [
      {
        userID: '0',
        messageID: v1(),
        message: 'FirstMessage',
        name: 'ProfileName',
        avatarSrc: ' ',
      },
      {
        userID: '2',
        messageID: v1(),
        message: 'SvetaName Secondt Message',
        name: 'SvetaName',
        avatarSrc: ' ',
      },
    ],
    ['3']: [
      {
        userID: '0',
        messageID: v1(),
        message: 'FirstMessage',
        name: 'ProfileName',
        avatarSrc: ' ',
      },
      {
        userID: '3',
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
        userID: profileInfoData.id,
        messageID: v1(),
        name: profileInfoData.name,
        message,
        avatarSrc: profileInfoData.avatarSrc
      }
      return {...state, [userId]: [...state[userId], newMessage]};
    }
    default: return state;
  }
}