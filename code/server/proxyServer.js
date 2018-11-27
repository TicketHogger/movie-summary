const newrelic = require('newrelic');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const port = 3000;

const app = express();
app.use(compression());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/../public')));

app.use('/api', proxy({
  target: 'http://127.0.0.1:3007/',
  changeOrigin: true,
}));

app.listen(port, () => console.log('Proxy Server => listening on port:', port));
