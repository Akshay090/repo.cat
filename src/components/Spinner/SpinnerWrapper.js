import React, { Component, PropTypes } from 'react';
// import { patchXHR, unpatchXHR } from './Loadin';

export default class SpinnerWrapper extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  state = {
    loaded: 0,
    total: 100,
  };

  // componentDidMount() {
  //   patchXHR(window, [
  //     (evt) => {
  //       const { type, lengthComputable, loaded, total, target } = evt;
  //       this.setState({ set: this.state.set.add(target), called: this.state.called + 1 });
  //       if (type === 'load') {
  //         if (lengthComputable) {
  //           this.setState({
  //             loaded: this.state.loaded,
  //           });
  //         } else {

  //         }
  //       } else if (type === 'progress') {
  //         if (lengthComputable) {
  //           this.setState({
  //             loaded: this.state.loaded + loaded,
  //             total: this.state.total + total,
  //           });
  //         } else {
  //           this.setState({
  //             loaded: this.state.loaded + (this.state.total - this.state.loaded) / 2,
  //           });
  //         }
  //       } else if (type === 'abort') {
  //         if (lengthComputable) {

  //         } else {

  //         }
  //         console.warn(type);
  //       } else if (type === 'timeout') {
  //         if (lengthComputable) {

  //         } else {

  //         }
  //         console.warn(type);
  //       } else if (type === 'error') {
  //         if (lengthComputable) {

  //         } else {

  //         }
  //         console.warn(type);
  //       }
  //     },
  //   ]);
  // }

  // componentWillUnmount() {
  //   unpatchXHR(window);
  // }

  render() {
    const { loaded, total } = this.state;
    const { children } = this.props;
    const newChildren = React.Children.map(
      children,
      (child) => React.cloneElement(child, { loaded, total }),
    );

    return (
      <div>{ newChildren }</div>
    );
  }
}
