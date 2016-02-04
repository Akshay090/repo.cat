import React, { Component, PropTypes } from 'react';
import { Motion, spring, presets } from 'react-motion';
import { unix } from 'moment';
import cx from 'classnames';

import Markdown from '../../Markdown';

import styles from './SingleItem.css';

const noBubbleHandler = (evt) => { evt.stopPropagation(); };

const MAX_MARKDOWN_HEIGHT = 3000;

export default class SingleItem extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    langs: PropTypes.array, // @TODO could be undefined
    score: PropTypes.number.isRequired,
    time: PropTypes.number.isRequired,
    stars: PropTypes.number.isRequired,
    fullName: PropTypes.string.isRequired,
    gfmHtml: PropTypes.string.isRequired,
  };

  state = {
    isOpen: false,
  };

  getStyle = (show) => {
    // @TODO: is there a way to do this animation with only
    // `scale`, `translate`, `rotate`, and `opacity`?
    if (show === 1) {
      return {};
    }

    return {
      overflowY: 'hidden',
      visibility: show === 0 ? 'hidden' : 'visible', // accessibility
      maxHeight: show * MAX_MARKDOWN_HEIGHT,
      opacity: show,
      padding: `${show}rem 2.5rem`,
    };
  };

  handleToggle = (evt) => {
    evt.stopPropagation();

    this.setState({
      isOpen: !this.state.isOpen,
    });
  };

  render() {
    const { title, url, langs, score, time, stars, fullName, gfmHtml } = this.props;
    const { isOpen } = this.state;

    return (
      <div>
        <div
          className={styles.root}
          onTouchTap={this.handleToggle}
        >
          <div className={styles.score}>
            <span>{score}</span>
          </div>
          <div className={styles.content}>
            <h2 className={styles.title}>
              <a
                href={url}
                target="_blank"
                onTouchTap={noBubbleHandler}
              >
                {title}
              </a>
              <span className={styles.fullName}>({fullName})</span>
            </h2>
            <p className={styles.info}>
              <span>★ {stars === -1 ? '...' : stars}</span>|
              <span>{unix(time).fromNow()}</span>|
              { langs ? <span>{langs.join(', ')}</span> : '...'}
            </p>
          </div>
          {
            !gfmHtml ? null : (
              <div role="button" className={styles.button} onTouchTap={this.handleToggle}>
                <div
                  className={cx(
                    styles.arrowCommon,
                    isOpen ? styles.upArrow : styles.downArrow,
                  )}
                />
                { isOpen ? 'collapse' : 'expand' }
              </div>
            )
          }
        </div>
        <Motion style={{ show: spring(isOpen ? 1 : 0, presets.noWobble) }}>
        {({ show }) => show === 0 || !gfmHtml ?
              null : // dont render unnecessary stuff
            <Markdown
              gfmHtml={gfmHtml}
              style={this.getStyle(show)}
            />}
        </Motion>
      </div>
    );
  }
}
