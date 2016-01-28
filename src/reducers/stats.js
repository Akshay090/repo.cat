/*
  Builds the OrderedSet for languages
*/

import {
  Map as iMap,
  OrderedSet as iOrderedSet,
} from 'immutable';

import { flatMap } from '../lib';

import {
  REPO_LANGS,
  REPO_LANG,
//  FETCH_PENDING,
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

      const langs = Object.keys(data);

      return state.updateIn(
        [ category ],
        (set) => set.union(langs),
      );

    // case REPO_LANGS:
    //   const { category, langs } = action.payload;
    //
    //   const langSeq = flatMap(
    //     langs.map((payload) => payload.langs),
    //     Object.keys,
    //   );
    //
    //   return state.set(category, iOrderedSet(langSeq));
    default:
      return state;
  }
};

export default langsReducer;
