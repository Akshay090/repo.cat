const express = require('express');
const app = express();

const IPAddress = '0.0.0.0';
const PORT = JSON.parse(process.env.PORT || 5000);
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
