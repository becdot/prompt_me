const express = require('express');
const bodyParser = require('body-parser');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();
const server = express();
const port = process.env.port || 8000;

module.exports = app.prepare()
  .then(() => server
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }))
    .use((req, res) => handle(req, res)))
  .then(() => server.listen(port, () => console.log(`> Ready on http://localhost:${port}`)))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
