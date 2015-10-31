import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../actions';

import { isSubsetOf } from '../../utils';
import filterObject from 'fbjs/lib/filterObject';

import Item from '../Item';
import Filter from '../Filter';
import Stats from '../Stats';

import styles from './App.css';
import '../../styles/reset.css';
import '../../styles/global.css';

const mapStateToProps = (state, props) => {
  const dataType = props.location.pathname.slice(1);
  return {
    dataType,
    data: state.data[dataType].data,
    hnCount: state.data[dataType].hnCount,
    filter: state.filter,
    langs: state.data.langs[dataType],
  };
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
  const { dataType } = stateProps;
  const map = {
    top: dispatchProps.fetchTopData,
    new: dispatchProps.fetchNewData,
    show: dispatchProps.fetchShowData,
  };

  return {
    location: ownProps.location,
    dataType,
    ...stateProps,
    fetch: map[dataType],
    filterSwitch: dispatchProps.filterSwitch,
  };
};

@connect(mapStateToProps, actions, mergeProps)
export default class App extends Component {
  static propTypes = {
    dataType: PropTypes.string.isRequired,
    data: PropTypes.array,
    filter: PropTypes.object.isRequired,
    langs: PropTypes.array,
    hnCount: PropTypes.number,

    fetch: PropTypes.func.isRequired,
    filterSwitch: PropTypes.func.isRequired,
  };

  state = {
    showFilter: true,
  }

  componentDidMount() {
    this.props.fetch();
    window.p = this.props;
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.dataType !== nextProps.dataType) {
      nextProps.fetch();
    }
  }

  handleFilterClick = (lang) => (evt) => { // notice the type here
    evt.stopPropagation();
    this.props.filterSwitch(lang);
  };

  handleHideFilterClick = (evt) => {
    evt.stopPropagation();
    this.setState({
      showFilter: !this.state.showFilter,
    });
  }

  renderItems = () => this.props.data.filter((item) => isSubsetOf(
    Object.keys(filterObject(this.props.filter, (val) => val)),
    Object.keys(item.github.langs)
  )).map((item, idx) => (
    <Item
      key={idx}
      title={item.title}
      langs={item.github.langs}
      url={item.url}
      score={item.score}
      time={item.time}
      stars={item.github.stargazers_count}
      fullName={item.github.full_name}
    />
  ));

  renderFilter = () => {
    return (
      <div className={styles.filterContainer}>
        <div className={styles.filterControl}>
          <div
            className={this.state.showFilter ? styles.upArrow : styles.downArrow}
            onClick={this.handleHideFilterClick}
          />
        </div>
        <div className={this.state.showFilter ? styles.allFilters : styles.hideFilters}>
          {this.props.langs.map(([ lang, count ], idx) => (
            <Filter
              selected={!!this.props.filter[lang]}
              handleClick={this.handleFilterClick(lang)}
              lang={lang}
              key={idx}
            />
          ))}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className={styles.root}>
        {this.props.langs ? this.renderFilter() : null}
        {this.props.data ? this.renderItems() : null}
        {this.props.data ? (
           <Stats
             dataType={this.props.dataType}
             itemCount={this.props.data.length}
             hnCount={this.props.hnCount}
             />
         ) : null}
      </div>
    );
  }
}
