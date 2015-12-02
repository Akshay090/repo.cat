import React, { Component } from 'react';

import GreenBar from './GreenBar';
import SpinnerWrapper from './SpinnerWrapper';

export default class SpinnerDemo extends Component {
  render() {
    return (
      <SpinnerWrapper>
        <GreenBar />
      </SpinnerWrapper>
    );
  }
}
