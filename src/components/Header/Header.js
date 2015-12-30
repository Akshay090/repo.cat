import React from 'react';
import { Link, IndexLink } from 'react-router';

import cx from 'classnames';
import styles from './Header.css';

const headerItems = [
  { text: 'top', linkTo: '/top' },
  { text: 'new', linkTo: '/new' },
  { text: 'show', linkTo: '/show' },
];

const Header = () => (
  <header className={styles.root}>
    <IndexLink
      to="/"
      className={cx(styles.logoContainer, styles.resetA)}
    >
      <span className={styles.logoText}>repo.cat</span>
    </IndexLink>
    <div className={styles.navsContainer}>
      {
        headerItems.map((item, idx) => (
          <Link
            to={item.linkTo}
            key={idx}
            className={cx(styles.nav, styles.resetA)}
            activeClassName={cx(styles.activeNav, styles.resetA)}
          >
            {item.text}
          </Link>
        ))
      }
    </div>
  </header>
);

export default Header;
