import React, { PropTypes } from 'react';

import cx from 'classnames';
import styles from './SingleFilter.css';

const SingleFilter = ({ selected, handleClick, lang }) => (
  <div
    role="button"
    className={cx({
      [styles.root]: true,
      [styles.selected]: selected,
    })}
    onClick={handleClick}
  >
    {lang}
  </div>
);

SingleFilter.propTypes = {
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default SingleFilter;
