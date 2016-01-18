import React from 'react';
import PureComponent from '../PureComponent';
// import Filters from './Filters';
// import styles from './Main.css';

import topConnector from './topConnector';

class Main extends PureComponent {
  static propTypes = {

  };

  render() {
    const { location } = this.props.routing;
    return (
      <div>
        {location && location.pathname}
      </div>
    );
  }
}

export default topConnector(Main);
