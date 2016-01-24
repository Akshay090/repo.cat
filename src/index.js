require('fetch-xhr'); // polyfill for loadin

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import 'normalize.css';
import './styles/global.css';

import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';

import getRootRoute from './routes';
import configStore from './store/configStore';

const store = configStore();

if (__DEV__) {
  window.s = () => store.getState();
}

render(
  <Provider store={store}>
    {getRootRoute()}
  </Provider>,
  document.getElementById('root'),
);
