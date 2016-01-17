/* eslint-disable no-console */
const open = require('open');

const openInBrowser = (url) => {
  console.log(`openInBrowser: ${url}`);
  open(url);
};

module.exports = openInBrowser;
