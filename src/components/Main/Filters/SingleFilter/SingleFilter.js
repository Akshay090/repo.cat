import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import cx from 'classnames';
import styles from './SingleFilter.css';
import commonStyles from '../../../../styles/common.css';

const SingleFilter = ({ selected, destination, lang }) => (
  <Link
    to={destination}
    className={cx({
      [commonStyles.resetA]: true,
      [styles.link]: true,
      [styles.selected]: selected,
    })}
  >
    {lang}
  </Link>
);

SingleFilter.propTypes = {
  selected: PropTypes.bool.isRequired,
  destination: PropTypes.object.isRequired,
  lang: PropTypes.string.isRequired,
};

export default SingleFilter;
