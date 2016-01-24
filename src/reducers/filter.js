import {
  FILTER_LANG_SWITCH,
  FILTER_SET_STATUS,
} from '../constants';

import { Map as iMap } from 'immutable';

const initialFilterState = iMap();

const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case FILTER_SET_STATUS:
      return iMap(action.payload);

    case FILTER_LANG_SWITCH:
      return state.set(action.payload, !state.get(action.payload));

    default:
      return state;
  }
};

export default filterReducer;
