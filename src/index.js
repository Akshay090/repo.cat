require('fetch-xhr'); // polyfill

import React from 'react';
import { render } from 'react-dom';

import 'normalize.css';
import './styles/global.css';

import App from './App';

render(
  <App />,
  document.getElementById('root'),
);
