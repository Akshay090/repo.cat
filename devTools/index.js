const openInBrowser = require('./lib/openInBrowser');
const keypress = require('keypress');
const once = require('./lib/once');

const keyPressHookIn = (ip, port) => {
  keypress(process.stdin);

  process.stdin.on('keypress', (ch, key) => {
    if (!key) return;

    switch (key.name) {
      case 'o':
        openInBrowser(`http://${ip}:${port}`);
        break;
      default:
        break;
    }
  });
};

module.exports = {
  keyPressHookIn: once(keyPressHookIn),
};
