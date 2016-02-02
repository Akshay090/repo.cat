/* eslint-disable max-len */

import React, { PropTypes } from 'react';

import styles from './Stats.css';
import { oxfordJoin, capitalizeFirstLetter } from '../../../lib';

const Stats = ({ selectedLangs, hnCount, ghCount, currentCount, type }) => {
  const useOrUses = currentCount === 1 ? 'uses' : 'use';

  return (
    <div className={styles.root}>
      <p>Found {ghCount} GitHub repos in {hnCount} Hacker News {capitalizeFirstLetter(type)} items.</p>
      <p>
        {
          currentCount === ghCount ? 'You have no filter selected.' :
            `${currentCount} of them ${useOrUses} ${oxfordJoin(selectedLangs)}.`
          }
      </p>
    </div>
  );
};

Stats.propTypes = {
  selectedLangs: PropTypes.array.isRequired,
  hnCount: PropTypes.number.isRequired,
  ghCount: PropTypes.number.isRequired,
  currentCount: PropTypes.number.isRequired,
  type: PropTypes.string.isRequired,
};

export default Stats;
