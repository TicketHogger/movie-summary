const express = require('express');

const app = express();
const path = require('path');
const db = require('../database/index.js');

app.use(express.static(path.join(__dirname, '/../public')));

app.get('/api/movies/:movieId/summary', (req, res) => {
  db.getSummary((err, results) => {
    if (err) res.status(500).send(err.message);
    for (let i = 0; i < results.length; i += 1) {
      if (results[i].id === Number(req.params.movieId)) {
        res.send(results[i]);
        break;
      }
    }
  });
});

module.exports = app;
