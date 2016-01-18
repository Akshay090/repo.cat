import React, { PropTypes } from 'react';

// import cx from 'classnames';
import styles from './Filters.css';
import SingleFilter from './SingleFilter';

const Filters = ({ langs, showFilter, filterStatus, handleHideFilterClick, handleFilterClick }) => (
  <div className={styles.root}>
    <div className={styles.control}>
      <div
        className={showFilter ? styles.upArrow : styles.downArrow}
        onClick={handleHideFilterClick}
      />
    </div>
    <div className={showFilter ? styles.allFilters : styles.hideFilters}>
      {langs.map(([ lang, count ], idx) => (
        <SingleFilter
          selected={!!filterStatus[lang]}
          handleClick={handleFilterClick(lang)}
          lang={lang}
          key={idx}
        />
      ))}
    </div>
  </div>
);

Filters.propTypes = {
  langs: PropTypes.array.isRequired,
  showFilter: PropTypes.bool.isRequired,
  filterStatus: PropTypes.object.isRequired,
  handleHideFilterClick: PropTypes.func.isRequired,
  handleFilterClick: PropTypes.func.isRequired,
};

export default Filters;
