import {
  FILTER_LANG_SWITCH,
  FILTER_SET_STATUS,
} from '../constants';

export const filterSwitch = (dispatch) => (lang) => () => {
  dispatch({
    type: FILTER_LANG_SWITCH,
    payload: lang,
  });
};

export const setFilterStatus = (dispatch) => (filterStatus) => {
  dispatch({
    type: FILTER_SET_STATUS,
    payload: filterStatus,
  });
};
