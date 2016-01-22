import { /* Map as iMap, */ fromJS } from 'immutable';

// const arrayToObj = (array, getField) => {
//   return array.reduce(
//     (res, obj) => {
//       const field = getField(obj);
//       res[field] = obj; // eslint-disable-line no-param-reassign
//       return res;
//     },
//     {},
//   );
// }

import {
  HN_TOP_DATA,
  HN_NEW_DATA,
  HN_SHOW_DATA,
  actionToTypeMap,
  REPO_LANGS,
  REPO_READMES,
} from '../constants';

const initialDataState = fromJS({
  top: {
    langs: {},
  },
  new: {
    langs: {},
  },
  show: {
    langs: {},
  },
});

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case HN_TOP_DATA:
    case HN_NEW_DATA:
    case HN_SHOW_DATA:
      const newState = state.merge(
        actionToTypeMap[action.type],
        fromJS(action.payload),
      );

      return newState;
      // break;
    case REPO_LANGS:
    case REPO_READMES:

      break;
    default:

      break;
  }
};

export default dataReducer;
