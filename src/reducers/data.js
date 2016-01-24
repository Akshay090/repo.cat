import {
  Map as iMap,
  OrderedMap as iOrderedMap,
  fromJS,
} from 'immutable';

import {
  HN_TOP_DATA,
  HN_NEW_DATA,
  HN_SHOW_DATA,
  actionToTypeMap,
} from '../constants';

const initialDataState = iMap({
  top: iOrderedMap(),
  new: iOrderedMap(),
  show: iOrderedMap(),
});

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case HN_TOP_DATA:
    case HN_NEW_DATA:
    case HN_SHOW_DATA:
      const { repoData } = action.payload;
      return state.updateIn(
        [ actionToTypeMap[action.type] ],
        (ordMap) => ordMap.withMutations((oMutMap) => {
          // make it clear that this is set effect only
          repoData.forEach((obj) => {
            oMutMap.set(obj.id, fromJS(obj));
          });
        }),
      );

    default:
      return state;
  }
};

export default dataReducer;
