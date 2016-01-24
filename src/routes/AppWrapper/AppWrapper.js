import React, { Component, PropTypes } from 'react';

import styles from './AppWrapper.css';

import { Footer, Header } from '../../components/FooterAndHeader';
// import Spinner from '../../components/Spinner';

export default class AppWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    const { children, location } = this.props;

    return (
      <div className={styles.root}>
        <Header query={location.query} />
        {children}
        <Footer />
      </div>
    );
  }
}
