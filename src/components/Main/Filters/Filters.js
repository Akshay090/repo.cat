import React, { PropTypes } from 'react';
import { orderedSet } from 'react-immutable-proptypes';

import SingleFilter from './SingleFilter';

import cx from 'classnames';
import styles from './Filters.css';

const Filters = ({ langSet, showFilter, filterStatus, handleHideFilterClick, getDestination }) => (
  <div className={styles.root}>
    {
      !langSet.count() ? null :
      <div className={styles.control}>
        <div
          className={cx([ styles.arrowCommon, showFilter ? styles.upArrow : styles.downArrow ])}
          onClick={handleHideFilterClick}
        />
      </div>
    }
    <div
      className={cx([
        styles.filterCommon,
        showFilter ? styles.allFilters : styles.hideFilters,
      ])}
    >
      {langSet.map((lang, idx) => (
        <SingleFilter
          selected={!!filterStatus.includes(lang)}
          destination={getDestination(lang)}
          lang={lang}
          key={idx}
        />
      ))}
    </div>
  </div>
);

Filters.propTypes = {
  langSet: orderedSet.isRequired,
  showFilter: PropTypes.bool.isRequired,
  filterStatus: PropTypes.array.isRequired,
  handleHideFilterClick: PropTypes.func.isRequired,
  getDestination: PropTypes.func.isRequired,
};

export default Filters;
