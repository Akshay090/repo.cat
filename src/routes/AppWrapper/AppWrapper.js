import React, { Component, PropTypes } from 'react';

import styles from './AppWrapper.css';

import { Footer, Header } from '../../components/FooterAndHeader';
import { consoleHello } from '../../lib';
import { getAuth0Token } from '../../apis';

export default class AppWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    location: PropTypes.object.isRequired,
  };

  componentWillMount() {
    this.setState({ auth0Token: getAuth0Token() });
  }

  componentDidMount() {
    consoleHello();
  }

  render() {
    const { children, location } = this.props;
    return (
      <div className={styles.root}>
        <Header
          auth0Token={this.state.auth0Token}
          query={location.query}
        />
        {children}
        <Footer />
      </div>
    );
  }
}
