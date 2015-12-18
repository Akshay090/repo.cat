import React from 'react';
import styles from './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isBlue: true };
  }

  handleClick = () => {
    this.setState({ isBlue: !this.state.isBlue });
  }

  render() {
    return (
      <div
        onClick={this.handleClick}
        className={this.state.isBlue ? styles.blue : styles.red}
      >
        foobar
      </div>
    );
  }
}
