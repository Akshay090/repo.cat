require('fetch-xhr'); // polyfill
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import createHistory from 'history/lib/createHashHistory';

import rootRoute from './routes';

import './styles/reset.css';
import './styles/global.css';

import configureStore from './store/configStore';

const store = configureStore();

const history = createHistory();

if (__DEV__) {
  window.store = () => store.getState();
}

render(
  <Provider store={store}>
    {rootRoute(history)}
  </Provider>,
  document.getElementById('root')
);
