import React, { Component, PropTypes } from 'react';

import styles from './GreenBar.css';

export default class GreenBar extends Component {
  static propTypes = {
    total: PropTypes.number.isRequired,
    loaded: PropTypes.number.isRequired,
  };

  render() {
    const { loaded, total } = this.props;

    return (
      <div className={styles.root}>
        <div className={styles.total} >
          <div
            className={styles.loaded}
            style={{
              transform: `scaleX(${loaded / total})`,
              opacity: loaded === total ? 0 : 1,
            }}
          />
        </div>
      </div>
    );
  }
}
