import React, { Component } from 'react';
import styles from './Main.css';

export default class Main extends Component {
  render() {
    return (
      <div>
        {this.props.location && this.props.location.pathname}
      </div>
    );
  }
}
