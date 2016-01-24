const express = require('express');
const ip = require('ip');

const app = express();

const IPAddress = JSON.parse(process.env.EXPRESS_IP || ip.address());
const PORT = JSON.parse(process.env.EXPRESS_PORT || 5000);

app.use(express.static(__dirname + '/dist'));

app.listen(PORT, IPAddress, (err) => {
  if (err) {
    console.log(err); // eslint-disable-line no-console
    return;
  }

  console.log(`Listening at http://${IPAddress}:${PORT}`); // eslint-disable-line no-console
});
