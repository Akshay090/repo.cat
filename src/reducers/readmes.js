/*
  for an url (id), it's either
  - `FETCH_PENDING` for waiting for data
  - `false` for no readme info
  - or a readme object lake `{ content: 2212 }`
*/

import { Map as iMap, fromJS } from 'immutable';
import { Base64 } from 'js-base64';
import marked from 'marked';

import {
  HN_TOP_DATA,
  HN_NEW_DATA,
  HN_SHOW_DATA,
  REPO_READMES,
  FETCH_PENDING,
} from '../constants';

const initialDataState = iMap();

marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false,
});

const readmesReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case HN_TOP_DATA:
    case HN_NEW_DATA:
    case HN_SHOW_DATA:
      const { repoData } = action.payload;
      return state.withMutations((mutMap) => {
        repoData.forEach(({ id }) => {
          if (typeof mutMap.get(id) === 'undefined') {
            mutMap.set(id, FETCH_PENDING);
          }
        });
      });

    case REPO_READMES:
      const { readmes } = action.payload;
      return state.withMutations((mutMap) => {
        readmes.forEach(({ id, readme: readmeObj }) => {
          if (!readmeObj || typeof readmeObj.content !== 'string') {
            mutMap.set(id, false);
          } else {
            const textContent = Base64.decode(readmeObj.content);
            mutMap.set(id, fromJS({
              ...readmeObj,
              content: textContent,
              gfmHtml: marked(textContent),
            }));
          }
        });
      });
    default:
      return state;
  }
};

export default readmesReducer;
