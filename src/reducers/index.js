import forEachObject from 'fbjs/lib/forEachObject';

import { combineReducers } from 'redux';

import {
  HN_TOP_DATA,
  HN_NEW_DATA,
  HN_SHOW_DATA,
  FILTER_LANG_SWITCH,
} from '../constants';

const initialDataState = {
  top: {},
  new: {},
  show: {},
  langs: {},
};

const initialFilterState = {};

const getLangs = (data) => {
  const langObjs = data.map((x) => x.github.langs);
  const resultObj = {};

  langObjs.forEach((obj) => {
    forEachObject(obj, (val, key) => {
      if (resultObj.hasOwnProperty(key)) {
        resultObj[key] += 1;
      } else {
        resultObj[key] = 1;
      }
    });
  });

  const resultArr = Object.keys(resultObj).map((key) => [ key, resultObj[key] ]);
  resultArr.sort((x, y) => y[1] - x[1]);
  return resultArr;
};

const typeMap = {
  [HN_TOP_DATA]: 'top',
  [HN_NEW_DATA]: 'new',
  [HN_SHOW_DATA]: 'show',
};

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case HN_TOP_DATA:
    case HN_NEW_DATA:
    case HN_SHOW_DATA:
      if (action.error) {
        return {
          ...state,
          [typeMap[action.type]]: action.payload,
        };
      }

      return {
        ...state,
        [typeMap[action.type]]: action.payload,
        langs: {
          ...state.langs,
          [typeMap[action.type]]: getLangs(action.payload.data),
        },
      };
    default:
      return state;
  }
};

const filterReducer = (state = initialFilterState, action) => {
  switch (action.type) {
    case FILTER_LANG_SWITCH:
      return {
        ...state,
        [action.payload]: !state[action.payload],
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  data: dataReducer,
  filter: filterReducer,
});

export default rootReducer;
