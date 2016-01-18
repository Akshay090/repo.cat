import {
  FILTER_LANG_SWITCH,
} from '../constants/UserSide';

import { Map as iMap } from 'immutable';

const initialFilterState = iMap();

const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case FILTER_LANG_SWITCH:
      return state.set(action.payload, !state.get(action.payload));
    default:
      return state;
  }
};

export default filterReducer;
