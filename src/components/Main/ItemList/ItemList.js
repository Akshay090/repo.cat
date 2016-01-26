import React, { PropTypes } from 'react';
import { map } from 'react-immutable-proptypes';

import { FETCH_PENDING } from '../../../constants';
import SingleItem from './SingleItem';

const getItemLangs = (id, langs) => {
  const res = langs.get(id);
  if (res === FETCH_PENDING) {
    return undefined;
  }
  return res.keySeq().toArray();
};

const ItemList = ({ itemData, filterStatus, langs, readmes }) => {
  const itemsToRender = itemData.filter((item) => {
    const currentLangs = langs.get(item.get('id'));
    if (currentLangs === FETCH_PENDING ||
        (currentLangs.count() === 0 && filterStatus.length === 0) ||
        filterStatus.length === 0) {
      return true;
    }

    return currentLangs.some((_, key) => filterStatus.includes(key));
  });

  return (
    <div>
      {itemsToRender && itemsToRender.valueSeq().map((item, idx) => {
        const itemId = item.get('id');

        return (
          <SingleItem
            key={idx}
            title={item.get('title')}
            url={item.get('url')}
            langs={getItemLangs(itemId, langs)}
            score={item.get('score')}
            time={item.get('time')}
            stars={item.getIn([ 'github', 'stargazers_count' ])}
            fullName={item.getIn([ 'github', 'full_name' ])}
            gfmHtml={readmes.get(itemId) ? readmes.getIn([ itemId, 'gfmHtml' ]) || '' : ''}
          />
        );
      })}
    </div>
  );
};

ItemList.propTypes = {
  itemData: map.isRequired,
  filterStatus: PropTypes.array.isRequired,
  langs: map.isRequired,
  readmes: map.isRequired,
};

export default ItemList;
