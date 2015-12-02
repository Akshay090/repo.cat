import React, { Component, PropTypes } from 'react';

import Remarkable from 'remarkable';
import styles from './Markdown.scss';

export default class Markdown extends Component {
  static propTypes = {
    data: PropTypes.string.isRequired,
    options: PropTypes.object.isRequired,
    style: PropTypes.object,
    className: PropTypes.string,
  };

  static defaultProps = {
    data: '',
    options: {},
  };

  constructor(...args) {
    super(...args);
    this.mdRenderer = new Remarkable({});
  }

  componentWillUpdate(nextProps) {
    if (nextProps.options !== this.props.options) {
      this.mdRenderer = new Remarkable(nextProps.options);
    }
  }

  render() {
    return (
      <article
        style={this.props.style}
        className={this.props.className || styles.root}
        dangerouslySetInnerHTML={{ __html: this.mdRenderer.render(this.props.data) }}
      />
    );
  }
}
