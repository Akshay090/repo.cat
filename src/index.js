require('fetch-xhr'); // polyfill for loadin

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import 'normalize.css';
import './styles/global.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { syncReduxAndRouter } from 'redux-simple-router';

import getRootRoute from './routes';
import configStore from './store/configStore';

const history = createHistory();
const store = configStore();

// if (__DEV__) {
//   window.store = () => store.getState();
// }

syncReduxAndRouter(history, store);

render(
  <Provider store={store}>
    {getRootRoute(history)}
  </Provider>,
  document.getElementById('root'),
);
