import React, { PropTypes } from 'react';
import moment from 'moment';

import styles from './SingleItem.css';

const SingleItem = ({ title, url, langs, score, time, stars, fullName }) => (
  <div className={styles.root}>
    <div className={styles.score}>
      <span> {score} </span>
    </div>
    <div className={styles.content}>
      <h2 className={styles.title}>
        <a href={url}>{title}</a>
        <span className={styles.fullName}>({fullName})</span>
      </h2>
      <p className={styles.info}>
        <a href={url}><span>★ {stars}</span></a>|
        <a href={url}><span>{moment.unix(time).fromNow()}</span></a>|
        { langs ? <span>{langs.join(', ')}</span> : '...'}
      </p>
    </div>
  </div>
);

SingleItem.propTypes = {
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  langs: PropTypes.array, // @TODO could be undefined
  score: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
  stars: PropTypes.number.isRequired,
  fullName: PropTypes.string.isRequired,
};

export default SingleItem;
