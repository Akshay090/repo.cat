import React, { PropTypes } from 'react';
import PureComponent from '../PureComponent';
// import Filters from './Filters';
// import styles from './Main.css';

export default class Main extends PureComponent {
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
