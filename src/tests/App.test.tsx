import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../app/App';
import {stateData} from "../redux/stateData";


test('renders learn react link', () => {
  render(<App stateData={stateData}/>);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
