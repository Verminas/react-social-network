import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

//data

export const dialogItemsData = [
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
];

export const messageItemsData = [
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
];
export const postItemsData = [
  {
    id: '1',
    postMessage: 'hi, i would like to talk with someone',
  },
  {
    id: '2',
    postMessage: 'hi, nice to meet you',
  },
  {
    id: '3',
    postMessage: 'do you want to find friends',
  },
  {
    id: '4',
    postMessage: 'yes, of course',
  },
];



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App dialogItemsData={dialogItemsData} messageItemsData={messageItemsData} postItemsData={postItemsData}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


