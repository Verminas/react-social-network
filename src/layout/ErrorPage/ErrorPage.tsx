// @flow
import * as React from 'react';
import s from './ErrorPage.module.css'

type Props = {

};
export const ErrorPage = (props: Props) => {
  return (
    <div className={s.error}>
      <span>Error 404. Please try again...</span>
    </div>
  );
};

