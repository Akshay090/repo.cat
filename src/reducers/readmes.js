/*
  for an url (id), it's either
  - `undefined` for waiting for data
  - `false` for no readme info
  - or a readme object lake `{ content: 2212 }`
*/

import { Map as iMap, fromJS } from 'immutable';
import { Base64 } from 'js-base64';
import marked from 'marked';

import {
  REPO_README,
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
    case REPO_README:
      const { id, data } = action.payload;
      if (!data || typeof data.content !== 'string') {
        return state.set(id, false);
      }

      const textContent = Base64.decode(data.content);
      return state.set(id, fromJS({
        ...data,
        content: textContent,
        gfmHtml: marked(textContent),
      }));

    default:
      return state;
  }
};

export default readmesReducer;
