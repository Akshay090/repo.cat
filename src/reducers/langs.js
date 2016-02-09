/*
  for an url (id), it's either
  - `undefined` for waiting for data
  - an empty object for no language info
  - or a lang object lake `{ python: 2212 }`
*/

import { Map as iMap, fromJS } from 'immutable';

import {
  REPO_LANG,
} from '../constants';

const initialDataState = iMap();

const langsReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case REPO_LANG: {
      const { id, data } = action.payload;
      return state.set(id, fromJS(data || {}));
    }

    default: {
      return state;
    }
  }
};

export default langsReducer;
