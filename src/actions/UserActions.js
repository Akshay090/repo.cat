import {
  FILTER_LANG_SWITCH,
} from '../constants/UserSide';

export const filterSwitch = (lang) => (dispatch) => {
  dispatch({
    type: FILTER_LANG_SWITCH,
    payload: lang,
  });
};
