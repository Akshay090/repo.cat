/*
  for an url (id), it's either
  - `undefined` for waiting for data
  - `false` for no readme info
  - or a readme object lake `{ content: 2212 }`
*/

import { Map as iMap, fromJS } from 'immutable';

import {
  REPO_README,
} from '../constants';

const initialDataState = iMap();

const readmesReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case REPO_README: {
      const { id, gfmHtml } = action.payload;
      if (typeof gfmHtml !== 'string') {
        return state.set(id, false);
      }

      return state.set(id, fromJS({
        gfmHtml,
      }));
    }

    default: {
      return state;
    }
  }
};

export default readmesReducer;
