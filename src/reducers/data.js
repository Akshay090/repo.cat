import {
  Map as iMap,
  OrderedMap as iOrderedMap,
  fromJS,
} from 'immutable';

import {
  POSSIBLE_REPO,
  REPO_INFO,
} from '../constants';

const initialDataState = iMap({
  top: iOrderedMap(),
  new: iOrderedMap(),
  show: iOrderedMap(),
});

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case POSSIBLE_REPO: { // block scope
      const { category, id, data } = action.payload;
      return state.updateIn(
        [ category ],
        (ordMap) => ordMap.set(id, fromJS(data)),
      );
    }

    case REPO_INFO: {
      const { category, id, data } = action.payload;
      return state.updateIn(
        [ category ],
        (ordMap) => data ? ordMap.mergeIn([ id, 'github' ], fromJS(data)) : ordMap.remove(id),
      );
    }

    default:
      return state;
  }
};

export default dataReducer;
