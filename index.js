const rollbar = require('rollbar');
const express = require('express');
const compression = require('compression');

const app = express();

const IPAddress = '0.0.0.0';
const PORT = JSON.parse(process.env.PORT || 5000);
const ROOT_PATH = `${__dirname}/dist`;

app.use(compression());

app.use(express.static(ROOT_PATH));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: ROOT_PATH });
});

app.use(rollbar.errorHandler('13b7c2facd104874ac16204769da9c0b', {
  environment: 'production',
  exitOnUncaughtException: true,
}));

app.listen(PORT, IPAddress, (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }

  console.log(`Listening at http://${IPAddress}:${PORT}`); // eslint-disable-line no-console
});
