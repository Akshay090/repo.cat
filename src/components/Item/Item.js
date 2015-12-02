import React, { Component, PropTypes } from 'react';
import { Motion, spring } from 'react-motion';
import moment from 'moment';

import Markdown from '../Markdown';
import styles from './Item.css';

const MAX_MARKDOWN_HEIGHT = 3000;

export default class Item extends Component {
  state = {
    isOpen: false,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    langs: PropTypes.object.isRequired,
    score: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    stars: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    readme: PropTypes.string.isRequired,
  };

  handleToggle = (evt) => {
    evt.stopPropagation();

    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  renderMarkdown = (data) => {
    if (!data || data === '') {
      return null;
    }

    return (
      <Markdown data={data} />
    );
  }

  getStyle = (show) => {
    // @TODO
    // is there a way to do this animation with only
    // scale, translate, rotate, and opacity?
    if (show === 1) {
      return null;
    }

    return {
      overflowY: 'hidden',
      visibility: show === 0 ? 'hidden' : 'visible', // accessibility
      maxHeight: show * MAX_MARKDOWN_HEIGHT,
      opacity: show,
      padding: `${show}rem 3rem`,
    };
  }

  render() {
    const {
      title,
      url,
      langs,
      score,
      time,
      stars,
      fullName,
      readme,
    } = this.props;

    return (
      <div>
        <div
          className={styles.itemRoot}
          onTouchTap={this.handleToggle}
        >
          <div className={styles.score}>
            <span> {score} </span>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>
              <a href={url}>{title}</a>
              <span className={styles.fullName}>({fullName})</span>
            </h2>
            <p className={styles.info}>
              <a href={url}><span>★ {stars}</span></a>|
              <a href={url}><span>{moment.unix(time).fromNow()}</span></a>|
              <span>{Object.keys(langs).join(', ')}</span>
            </p>
          </div>
        </div>
        <Motion style={{ show: spring(this.state.isOpen ? 1 : 0) }}>
          {
            ({ show }) => !readme || readme === '' ?
              null :
              <Markdown
                data={readme}
                style={this.getStyle(show)}
              />
          }
        </Motion>
      </div>
    );
  }
}
