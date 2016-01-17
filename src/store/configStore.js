import * as reducers from '../reducers';
import { browserHistory } from 'react-router';

import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { syncHistory } from 'redux-simple-router';

const rootReducer = combineReducers(reducers);


const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(
  reduxRouterMiddleware,
  thunkMiddleware,
  createLogger(),
)(createStore);

const configureStore = (initialState) => {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;

// import { createStore, applyMiddleware } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import createLogger from 'redux-logger';
//
// import rootReducer from '../reducers';
//
// const createStoreWithMiddleware = applyMiddleware(
//   thunkMiddleware,
//   createLogger(),
// )(createStore);
//
// const configureStore = (initialState) => {
//   const store = createStoreWithMiddleware(rootReducer, initialState);
//
//   if (module.hot) {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers');
//       store.replaceReducer(nextRootReducer);
//     });
//   }
//
//   return store;
// };
//
// export default configureStore;
