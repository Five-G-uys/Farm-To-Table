// Import Dependencies
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOMClient from 'react-dom/client';
import App from './components/App';
import { createContext } from 'react';
import './styles.css';
import { createTheme } from '@mui/system';

const theme = createTheme({
  palette: {
    type: 'light',
  },
});
export const ThemeContext = createContext(null);

const element = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const id: any = document.getElementById('app');
const root = ReactDOMClient.createRoot(id);
root.render(element);
