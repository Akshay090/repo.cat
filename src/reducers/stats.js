/*
  Builds the OrderedSet for languages
*/

import {
  Map as iMap,
  OrderedSet as iOrderedSet,
} from 'immutable';

import {
  REPO_LANG,
  HN_RAW_COUNT,
} from '../constants';

const initialDataState = iMap({
  top: iOrderedSet(),
  show: iOrderedSet(),
  new: iOrderedSet(),
  rawCount: iMap({
    top: 0,
    show: 0,
    new: 0,
  }),
});

const langsReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case REPO_LANG: {
      const { category, data } = action.payload;

      const langs = Object.keys(data); // @TODO keep the order of the set

      return state.updateIn(
        [ category ],
        (set) => set.union(langs),
      );
    }

    case HN_RAW_COUNT: {
      const { category, count } = action.payload;
      return state.setIn([ 'rawCount', category ], count);
    }

    default:
      return state;
  }
};

export default langsReducer;
