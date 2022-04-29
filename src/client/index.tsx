import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOMClient from 'react-dom/client';
import App from './components/App';

import './styles.css';

const element = (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const id: any = document.getElementById('app');
const root = ReactDOMClient.createRoot(id);
root.render(element);
