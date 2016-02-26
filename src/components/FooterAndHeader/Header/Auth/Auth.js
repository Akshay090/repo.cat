import React, { Component, PropTypes } from 'react';
import styles from './Auth.css';

import { showAuthAndRetrieveTokens } from '../../../../apis';

export default class Auth extends Component {
  static propTypes = {
    auth0Token: PropTypes.string,
  };

  render() {
    const { auth0Token } = this.props;

    return (
      <div
        className={styles.auth}
        onClick={showAuthAndRetrieveTokens}
      >
        {auth0Token ? 'logged!' : 'Login'}
      </div>
    );
  }
}
