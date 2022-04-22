import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './components/App';
import { BrowserRouter as Router } from 'react-router-dom';

const element = (
  <Router>
    <App />
  </Router>
);

ReactDOM.render(element, document.getElementById('app'));
