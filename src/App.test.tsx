import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import {dialogItemsData, messageItemsData, postItemsData} from "./index";

test('renders learn react link', () => {
  render(<App dialogItemsData={dialogItemsData} messageItemsData={messageItemsData} postItemsData={postItemsData}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
