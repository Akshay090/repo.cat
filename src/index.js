require('fetch-xhr'); // polyfill for loadin

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import 'normalize.css';
import './styles/global.css';

import React from 'react';
import { render } from 'react-dom';
// import { Provider } from 'react-redux';
// import { createHistory } from 'history';
// const history = createHistory();

// if (__DEV__) {
//   window.store = () => store.getState();
// }

import App from './App';

render(
  <App />,
  document.getElementById('root'),
);
