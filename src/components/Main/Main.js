import React, { Component, PropTypes } from 'react';
import { map } from 'react-immutable-proptypes';
// import PureComponent from '../PureComponent';
import Filters from './Filters';
import styles from './Main.css';

import { arrayPop } from '../../lib';

import topConnector from './topConnector';

class Main extends Component { // @TODO use PureComponent
  static propTypes = {
    data: map.isRequired,
    stats: map.isRequired,

    fetchData: PropTypes.func.isRequired,
    routing: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
  };

  state = {
    showFilter: true,
  };

  componentDidMount() {
    this.props.fetchData();
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

  // @TODO sync router query to the store? is it necessary?
  // filterSwitch = (langs) => (newLangClick) => () => {
  //   const idx = langs.indexOf(newLangClick);
  //   if (idx === -1) {
  //     langs.push(newLangClick);
  //   } else {
  //     langs.splice(idx, 1);
  //   }

  //   this.props.setFilterStatus(
  //     seqToObj(langs),
  //   );
  // };

  render() {
    window.p = this.props;
    const {
      stats,
//      filters,
//      filterSwitch,
    } = this.props;
    const { location } = this.props.routing;

    const whatAmI = location.pathname.substring(1);
    const filters = location.query.filters || [];
    const loc = Array.isArray(filters) ? filters : [ filters ];
    return (
      <div className={styles.root}>
        <Filters
          langSet={stats.get(whatAmI)}
          showFilter={this.state.showFilter}
          filterStatus={loc}
          handleHideFilterClick={this.handleHideFilterClick}
          getDestination={this.getDestination(location.pathname, loc)}
        />
        <pre>
          {JSON.stringify(location.query, null, 2)}
        </pre>
      </div>
    );
  }
}

export default topConnector(Main);
