import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import * as reducers from '../reducers';
import * as middlewares from '../middlewares';

const rootReducer = combineReducers(reducers);

const createStoreWithMiddleware = compose(
  applyMiddleware(...Object.values(middlewares)),
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
