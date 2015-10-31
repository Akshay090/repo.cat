import React, { Component, PropTypes } from 'react';

import styles from './AppWrapper.css';

import Header from '../../components/Header';
import Footer from '../../components/Footer';

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
