import React, { Component, PropTypes } from 'react';

import marked from 'marked';
import styles from './Markdown.css';

export default class Markdown extends Component {
  static propTypes = {
    data: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
  };

  static defaultProps = {
    data: '',
    style: {},
  };

  constructor(...args) {
    super(...args);
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: true,
      smartLists: true,
      smartypants: false,
    });
  }

  render() {
    const { style, data } = this.props;

    return (
      <article
        style={style}
        className={styles.root}
        dangerouslySetInnerHTML={{ __html: marked(data) }}
      />
    );
  }
}
