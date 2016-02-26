require('fetch-xhr'); // polyfill for loadin

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import 'normalize.css';
import './styles/global.css';

import React from 'react';

import { render } from 'react-dom';
import { Provider } from 'react-redux';

import getRootRoute from './routes';
import configStore from './store/configStore';

const store = configStore();
const history = syncHistoryWithStore(browserHistory, store);

if (__DEV__) {
  window.s = () => store.getState();
}

render(
  <Provider store={store}>
    {getRootRoute(history)}
  </Provider>,
  document.getElementById('root'),
);
