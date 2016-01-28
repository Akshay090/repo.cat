/*
  Builds the OrderedSet for languages
*/

import {
  Map as iMap,
  OrderedSet as iOrderedSet,
} from 'immutable';

import {
  REPO_LANG,
} from '../constants';

const initialDataState = iMap({
  top: iOrderedSet(),
  show: iOrderedSet(),
  new: iOrderedSet(),
});

const langsReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case REPO_LANG:
      const { category, data } = action.payload;

      const langs = Object.keys(data); // @TODO keep the order of the set

      return state.updateIn(
        [ category ],
        (set) => set.union(langs),
      );
    default:
      return state;
  }
};

export default langsReducer;
