import React, { PropTypes } from 'react';
import { map } from 'react-immutable-proptypes';
import PureComponent from '../PureComponent';
import { arrayPop } from '../../lib';

import Filters from './Filters';
import Stats from './Stats';
import ItemList from './ItemList';
import Spinner from '../Spinner';

import styles from './Main.css';

import topConnector from './topConnector';

class Main extends PureComponent { // routing object is safe (it changes)
  static propTypes = {
    data: map.isRequired,
    readmes: map.isRequired,
    stats: map.isRequired,
    langs: map.isRequired,
    routing: PropTypes.object.isRequired,

    fetchData: PropTypes.func.isRequired,
    type: PropTypes.string.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    showFilter: false,
  };

  componentDidMount() {
    const { data, type } = this.props;

    if (data.get(type).count() === 0) {
      this.props.fetchData();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data: newData, type: newType } = nextProps;
    const { type: currentType } = this.props;
    if (currentType !== newType && newData.get(newType).count() === 0) {
      nextProps.fetchData();
    }
  }

  getDestination = (pathname, currentLangs) => (newLang) => {
    const idx = currentLangs.indexOf(newLang);
    let filters;
    if (idx === -1) {
      // yo make sure the operation is non-mutative right here
      filters = currentLangs.concat([ newLang ]);
    } else {
      filters = arrayPop(currentLangs, idx);
    }

    return {
      pathname,
      query: { filters },
    };
  };

  handleHideFilterClick = () => {
    this.setState({
      showFilter: !this.state.showFilter,
    });
  };

  render() {
    if (__DEV__) {
      window.p = this.props;
    }

    const { data, stats, routing, langs, readmes } = this.props;
    const { location } = routing;

    const whatAmI = location.pathname.substring(1);
    const langSet = stats.get(whatAmI);
    const itemData = data.get(whatAmI);
    const queryfilters = location.query.filters || [];
    const queryFilterStatus = Array.isArray(queryfilters) ? queryfilters : [ queryfilters ];

    // @TODO check if is fetching
    const validFilterStatus = queryFilterStatus.filter((item) => langSet.includes(item));

    const itemsToRender = itemData.filter((item) => {
      // @TODO a lot more computations can be lifted.
      const itemLangs = langs.get(item.get('id'));

      // data isn't ready yet, or there's no filter
      if (!itemLangs || validFilterStatus.length === 0) {
        return true;
      }

      return itemLangs.some((_, key) => validFilterStatus.includes(key));
    });

    return (
      <div className={styles.root}>
        {
          !itemData.count() ? <Spinner /> : [ // ahh keys. do keys affect performance?
            <Filters
              key={0}
              langSet={langSet}
              showFilter={this.state.showFilter}
              filterStatus={validFilterStatus}
              handleHideFilterClick={this.handleHideFilterClick}
              getDestination={this.getDestination(location.pathname, validFilterStatus)}
            />,
            <ItemList
              key={1}
              itemsToRender={itemsToRender}
              langs={langs}
              readmes={readmes}
            />,
            <Stats
              key={2}
              selectedLangs={validFilterStatus}
              hnCount={stats.getIn([ 'rawCount', whatAmI ])}
              ghCount={itemData.count()}
              currentCount={itemsToRender.count()}
              type={whatAmI}
            />,
          ]
        }
      </div>
    );
  }
}

export default topConnector(Main);
