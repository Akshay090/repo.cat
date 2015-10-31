import React, { PropTypes } from 'react';
import styles from './Stats.css';

const Stats = ({ itemCount, hnCount, dataType }) => (
  <div className={styles.root}>
    Found { itemCount } github repos in { hnCount } HN {dataType} items.
  </div>
);

Stats.propTypes = {
  itemCount: PropTypes.number.isRequired,
  hnCount: PropTypes.number.isRequired,
  dataType: PropTypes.string.isRequired,
};

export default Stats;
