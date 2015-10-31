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

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case HN_TOP_DATA:
      return {
        ...state,
        top: action.payload,
        langs: {
          ...state.langs,
          top: getLangs(action.payload.data),
        },
      };
    case HN_NEW_DATA:
      return {
        ...state,
        new: action.payload,
        langs: {
          ...state.langs,
          new: getLangs(action.payload.data),
        },
      };
    case HN_SHOW_DATA:
      return {
        ...state,
        show: action.payload,
        langs: {
          ...state.langs,
          show: getLangs(action.payload.data),
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
