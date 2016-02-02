import React from 'react';
import { map } from 'react-immutable-proptypes';

import SingleItem from './SingleItem';

const getItemLangs = (id, langs) => {
  const res = langs.get(id);
  if (!res) {
    return undefined;
  }
  return res.keySeq().toArray();
};

const ItemList = ({ itemsToRender, langs, readmes }) => (
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
          stars={item.getIn([ 'github', 'stargazers_count' ]) || -1}
          fullName={item.getIn([ 'github', 'full_name' ]) || '...'}
          gfmHtml={readmes.get(itemId) ? readmes.getIn([ itemId, 'gfmHtml' ]) || '' : ''}
        />
      );
    })}
  </div>
);

ItemList.propTypes = {
  itemsToRender: map.isRequired,
  langs: map.isRequired,
  readmes: map.isRequired,
};

export default ItemList;
