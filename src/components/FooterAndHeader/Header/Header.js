import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import cx from 'classnames';
import styles from './Header.css';
import commonStyles from '../../../styles/common.css';

import { capitalizeFirstLetter } from '../../../lib';

const headerItems = [
  { text: 'top', linkTo: '/top' },
  { text: 'new', linkTo: '/new' },
  { text: 'show', linkTo: '/show' },
];

const Header = ({ query }) => (
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
            to={{
              pathname: item.linkTo,
              query,
            }}
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

Header.propTypes = {
  query: PropTypes.object.isRequired,
};

export default Header;
