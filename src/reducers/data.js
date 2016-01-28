import {
  Map as iMap,
  OrderedMap as iOrderedMap,
  fromJS,
} from 'immutable';

import {
  HN_ITEMS_DATA,
} from '../constants';

const initialDataState = iMap({
  top: iOrderedMap(),
  new: iOrderedMap(),
  show: iOrderedMap(),
});

const dataReducer = (state = initialDataState, action) => {
  switch (action.type) {
    case HN_ITEMS_DATA:
      const { repoData, category } = action.payload;
      return state.updateIn(
        [ category ],
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
