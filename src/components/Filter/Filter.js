import React, { PropTypes } from 'react';

import cx from 'classnames';
import styles from './Filter.css';

const Filter = ({ selected, handleClick, lang }) => (
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

Filter.propTypes = {
  selected: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired,
  lang: PropTypes.string.isRequired,
};

export default Filter;
