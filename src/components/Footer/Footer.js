import React from 'react';
import styles from './Footer.css';

const Footer = () => (
  <footer className={styles.root}>
    <a href="about">
      About
    </a>
    <a
      href="https://github.com/keyanzhang/repo.cat"
      target="_blank"
    >
      Source on GitHub
    </a>
  </footer>
);

export default Footer;
