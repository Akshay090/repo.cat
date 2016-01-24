import React from 'react';
import { Link } from 'react-router';
import cx from 'classnames';

import styles from './Footer.css';
import commonStyles from '../../../styles/common.css';

const Footer = () => (
  <footer className={styles.root}>
    <Link
      to={'about'}
      className={cx(styles.nav, commonStyles.resetA)}
      activeClassName={cx(commonStyles.activeNav, commonStyles.resetA)}
    >
    About
    </Link>
    <a
      href="https://github.com/keyanzhang/repo.cat"
      target="_blank"
      className={commonStyles.resetA}
    >
      Source on GitHub
    </a>
  </footer>
);

export default Footer;
