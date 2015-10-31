import React from 'react';
import { Link } from 'react-router';

import logoImg from '../../../assets/face-with-open-mouth.png';

import cx from 'classnames';
import styles from './Header.css';

const headerItems = [
  { text: 'top', linkTo: '/top' },
  { text: 'new', linkTo: '/new' },
  { text: 'show', linkTo: '/show' },
];

const Header = () => {
  return (
    <header className={styles.root}>
      <Link
        to={'/'}
        className={cx(styles.logo, styles.resetA)}
        onClick={(e) => e.stopPropagation()}
      >
        <img src={logoImg} className={styles.logoImg} />
        <img src={logoImg} className={styles.logoImg} />
      </Link>
      <div className={styles.navsContainer}>
        {
          headerItems.map((item, idx) => {
            return (
              <Link
                to={item.linkTo}
                key={idx}
                className={styles.nav}
                activeClassName={styles.activeNav}
              >
                {item.text}
              </Link>
            );
          })
        }
      </div>
    </header>
  );
};

export default Header;
