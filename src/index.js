require('fetch-xhr'); // polyfill for loadin

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import 'normalize.css';
import './styles/global.css';

import React from 'react';
import { hashHistory } from 'react-router'

import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncReduxAndRouter } from 'redux-simple-router';

import getRootRoute from './routes';
import configStore from './store/configStore';

// const store = configStore();

// if (__DEV__) {
//   window.store = () => store.getState();
// }

// syncReduxAndRouter(history, store);

render(
//  <Provider store={store}>
    getRootRoute(hashHistory),
//  </Provider>,
  document.getElementById('root'),
);
