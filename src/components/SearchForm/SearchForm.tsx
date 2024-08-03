// @flow
import * as React from 'react';
import {ChangeEvent, KeyboardEvent, useState} from "react";

type Props = {
  onClickBtn: (title: string) => void
};
export const SearchForm = ({onClickBtn}: Props) => {
  const [title, setTitle] = useState('')

  const onChangeSearchForm = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value)
  }

  const onClickSearchBtn = () => {
    if(title.trim().length > 0){
      onClickBtn(title)
      setTitle('')
    }
  }

  const onKeyDownEnterSearchForm = (e: KeyboardEvent<HTMLInputElement> ) => {
    if(e.key === 'Enter'){
      onClickSearchBtn()
    }
  }

  return (
    <div>
      <input type="text" onChange={onChangeSearchForm} value={title} onKeyDown={onKeyDownEnterSearchForm} autoFocus/>
      <button onClick={onClickSearchBtn}>Find User</button>
    </div>
  );
};