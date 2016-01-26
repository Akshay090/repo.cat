const express = require('express');
const ip = require('ip');

const app = express();

const IPAddress = process.env.EXPRESS_IP || ip.address();
const PORT = JSON.parse(process.env.EXPRESS_PORT || 5000);
const ROOT_PATH = `${__dirname}/dist`;

app.use(express.static(ROOT_PATH));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root: ROOT_PATH });
});

app.listen(PORT, IPAddress, (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }

  console.log(`Listening at http://${IPAddress}:${PORT}`); // eslint-disable-line no-console
});
