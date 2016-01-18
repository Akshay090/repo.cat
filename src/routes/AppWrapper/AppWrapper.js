import React, { Component, PropTypes } from 'react';

import styles from './AppWrapper.css';

import { Footer, Header } from '../../components/FooterAndHeader';
// import Spinner from '../../components/Spinner';

export default class AppWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  render() {
    return (
      <div className={styles.root}>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
}
