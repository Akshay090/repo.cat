import React, { Component, PropTypes } from 'react';
// import Filters from './Filters';
// import styles from './Main.css';

export default class Main extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div>
        {this.props.location && this.props.location.pathname}
      </div>
    );
  }
}
