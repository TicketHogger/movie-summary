const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const morgan = require('morgan');
const db = require('../database/API');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/../public')));

app.get('/api/movies/movieId/:movieId/summary', (req, res) => {
  const { movieId } = req.params;
  db.getId(movieId, (record) => {
    res.json(record);
  });
});

app.get('/api/movies/title/:title/summary', (req, res) => {
  const { title } = req.params;
  db.getTitle(title, (record) => {
    res.json(record);
  });
});

app.post('/api/movies/', (req, res) => {
  db.create(req.body, (record) => {
    res.json(record);
  });
});

app.put('/api/movies/:movieId/summary', (req, res) => {
  // db.modify(req, res);
});

app.delete('/api/movies/:movieId/summary', (req, res) => {
  const { query } = req.body;
  db.delete(query, res);
  res.end('DELETE RECEIVED');
});


module.exports = app;
