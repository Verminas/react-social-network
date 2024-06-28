

const profileImg = 'https://img.freepik.com/premium-vector/man-character_665280-46970.jpg'

export type StateDataType = {
  profilePage: ProfilePageType
  messagesPage: MessagesPageType
  newsPage: Object
  musicPage:Object
  settingsPage: Object
  sideBar: SideBarType
}

export type ProfilePageType = {
  profileInfo: ProfileInfoType
  postItemsData: MessageType[]

}
export type ProfileInfoType = {
  name: string,
  profileImage: string,
  dateBirth: string,
  country: string,
  city: string,
  website: string,
  education: string,
}
export type MessageType = {
  id: string
  message: string
}
export type DialogItemType = {
  id: string
  name: string
}
export type MessagesPageType = {
  dialogItemsData: DialogItemType[]
  messageItemsData: MessageType[]
}
export type FriendItemType = {
  id: string
  name: string
}
export type SideBarType = {
  friends: FriendItemType[]
}

export const stateData: StateDataType = {
  profilePage: {
    profileInfo: {
      name: 'John Doe',
      profileImage: profileImg,
      dateBirth: '19.01.1984',
      country: 'USA',
      city: 'New York',
      website: 'https://www.linkedin.com/',
      education: 'BSU 19',
    },
    postItemsData: [
      {
        id: '1',
        message: 'hi, i would like to talk with someone',
      },
      {
        id: '2',
        message: 'hi, nice to meet you',
      },
      {
        id: '3',
        message: 'do you want to find friends',
      },
      {
        id: '4',
        message: 'yes, of course',
      },
    ],
  },
  messagesPage: {
    dialogItemsData: [
      {
        id: '1',
        name: 'Dmitry',
      },
      {
        id: '2',
        name: 'Sveta',
      },
      {
        id: '3',
        name: 'Valera',
      },
      {
        id: '4',
        name: 'Alex',
      },
      {
        id: '5',
        name: 'Natali',
      },
      {
        id: '6',
        name: 'Kevin',
      },
    ],
    messageItemsData: [
      {
        id: '1',
        message: 'Hello',
      },
      {
        id: '2',
        message: 'How are you?',
      },
      {
        id: '3',
        message: 'I am fine. Thank you. What do you do?',
      },
      {
        id: '4',
        message: 'I am working for my studying project now. It is my homework',
      },
      {
        id: '5',
        message: 'Oh, I hope it is not mathematics :(',
      },
    ] // нужно изменить стурктуру данных для сообщений на ассоциативный массив
  },
  newsPage: {},
  musicPage: {},
  settingsPage: {},
  sideBar: {
    friends: [
      {
        id: '1',
        name: 'Sveta'
      },
      {
        id: '2',
        name: 'Sasha'
      },
      {
        id: '3',
        name: 'Valera'
      },
    ]
  }
}

