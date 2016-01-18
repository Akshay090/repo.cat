import React from 'react';
import { Link, IndexLink } from 'react-router';

import cx from 'classnames';
import styles from './Header.css';
import commonStyles from '../FooterAndHeaderCommon.css';

import { capitalizeFirstLetter } from '../../../lib';

const headerItems = [
  { text: 'top', linkTo: '/top' },
  { text: 'new', linkTo: '/new' },
  { text: 'show', linkTo: '/show' },
];

const Header = () => (
  <header className={styles.root}>
    <IndexLink
      to="/"
      className={cx(styles.logoContainer, commonStyles.resetA)}
    >
      <span className={styles.logoText}>repo.cat</span>
    </IndexLink>
    <div className={commonStyles.navsContainer}>
      {
        headerItems.map((item, idx) => (
          <Link
            to={item.linkTo}
            key={idx}
            className={commonStyles.resetA}
            activeClassName={cx(commonStyles.activeNav, commonStyles.resetA)}
          >
            {capitalizeFirstLetter(item.text)}
          </Link>
        ))
      }
    </div>
  </header>
);

export default Header;
