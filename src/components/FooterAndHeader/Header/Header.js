import React, { Component, PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

import Auth from './Auth';

import cx from 'classnames';
import styles from './Header.css';
import commonStyles from '../../../styles/common.css';

import { capitalizeFirstLetter } from '../../../lib';

const headerItems = [
  { text: 'top', linkTo: '/top' },
  { text: 'new', linkTo: '/new' },
  { text: 'show', linkTo: '/show' },
];

class Header extends Component {
  static propTypes = {
    query: PropTypes.object.isRequired,
    auth0Token: PropTypes.string,
  };

  render() {
    const { query, auth0Token } = this.props;
    return (
      <header className={styles.root}>
        <IndexLink
          to="/"
          className={cx(styles.logoContainer, commonStyles.resetA)}
        >
          <div
            className={styles.repo}
          />
          <div
            className={cx(styles.logoTransit, styles.cat)}
          />
        </IndexLink>
        <div className={commonStyles.navsContainer}>
          {
            headerItems.map((item, idx) => (
              <Link
                to={{
                  pathname: item.linkTo,
                  query, // so that we keep the current filters when the route changes
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
        <Auth
          auth0Token={auth0Token}
        />
      </header>
    );
  }
}

export default Header;
