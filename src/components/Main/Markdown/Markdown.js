import React, { PropTypes } from 'react';
import cx from 'classnames';
import PureComponent from '../../PureComponent';

import styles from './Markdown.css';
import gfmStyles from 'github-markdown-css';

export default class Markdown extends PureComponent {
  static propTypes = {
    gfmHtml: PropTypes.string.isRequired,
    style: PropTypes.object.isRequired,
  };

  static defaultProps = {
    gfmHtml: '',
    style: {},
  };

  render() {
    const { style, gfmHtml } = this.props;

    return (
      <article
        style={style}
        className={cx(gfmStyles['markdown-body'], styles.root)}
        dangerouslySetInnerHTML={{ __html: gfmHtml }}
      />
    );
  }
}
