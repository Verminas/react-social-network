// @flow
import * as React from 'react';

type Props = {
  className?: string
  type?: "button" | "submit" | "reset" | undefined
  onClick: () => void
  children: React.ReactNode
};
export const Button = ({children, type, onClick, className}: Props) => {
  return (
    <button className={className} type={type || 'button'} onClick={onClick}>{children}</button>
  );
};