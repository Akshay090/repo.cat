/*
  for an url (id), it's either
  - `FETCH_PENDING` for waiting for data
  - an empty object for no language info
  - or a lang object lake `{ python: 2212 }`
*/

import { Map as iMap, fromJS } from 'immutable';

import {
  HN_ITEMS_DATA,
  REPO_LANGS,
  FETCH_PENDING,
} from '../constants';

const initialDataState = iMap();

const langsReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case HN_ITEMS_DATA:
      const { repoData } = action.payload;
      return state.withMutations((mutMap) => {
        repoData.forEach(({ id }) => {
          if (typeof mutMap.get(id) === 'undefined') {
            mutMap.set(id, FETCH_PENDING);
          }
        });
      });

    case REPO_LANGS:
      const { langs } = action.payload;
      return state.withMutations((mutMap) => {
        langs.forEach(({ id, langs: langObj }) => {
          mutMap.set(id, fromJS(langObj));
        });
      });

    default:
      return state;
  }
};

export default langsReducer;
