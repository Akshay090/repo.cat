import React, { Component, PropTypes } from 'react';
import { map } from 'react-immutable-proptypes';

import { arrayPop } from '../../lib';

import Filters from './Filters';
import styles from './Main.css';

import topConnector from './topConnector';

class Main extends Component { // @TODO use PureComponent
  static propTypes = {
    data: map.isRequired,
    stats: map.isRequired,

    fetchData: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  };

  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    showFilter: true,
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
    window.p = this.props;
    const { stats, routing } = this.props;
    const { location } = routing;

    const whatAmI = location.pathname.substring(1);
    const langSet = stats.get(whatAmI);

    const queryfilters = location.query.filters || [];
    const queryFilterStatus = Array.isArray(queryfilters) ? queryfilters : [ queryfilters ];

    // @TODO check if is fetching
    const validFilterStatus = queryFilterStatus.filter((item) => langSet.includes(item));

    return (
      <div className={styles.root}>
        <Filters
          langSet={langSet}
          showFilter={this.state.showFilter}
          filterStatus={validFilterStatus}
          handleHideFilterClick={this.handleHideFilterClick}
          getDestination={this.getDestination(location.pathname, validFilterStatus)}
        />
        <pre>
          {JSON.stringify(validFilterStatus, null, 2)}
        </pre>
      </div>
    );
  }
}

export default topConnector(Main);
