import React, { PropTypes } from 'react';
import PureComponent from '../PureComponent';
// import Filters from './Filters';
// import styles from './Main.css';

import topConnector from './topConnector';

class Main extends PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired,
    pathname: PropTypes.string.isRequired,
  };

  render() {
    console.log(this.props);
    return (
      <div>
        {this.props.location && this.props.location.pathname}
      </div>
    );
  }
}

export default topConnector(Main);
