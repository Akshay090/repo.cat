import React from 'react';
import cx from 'classnames';

import styles from './Spinner.css';

const Spinner = () => (
  <div className={styles.chasingDots}>
    <div className={cx(styles.dotsChild, styles.dot1)}></div>
    <div className={cx(styles.dotsChild, styles.dot2)}></div>
  </div>
);

export default Spinner;
