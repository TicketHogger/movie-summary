const express = require('express');

const app = express();
const path = require('path');
const morgan = require('morgan');
const db = require('../database/index.js');
// const logger = require('./logger');

app.use(morgan('dev'));
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

// {
//   "_id": "5beb5c0ccf29f85f95253f1f",
//   "id": 50,
//   "title": "quo quis modi",
//   "score": 65,
//   "duration": "1 hr 30 min",
//   "rating": "PG-13",
//   "mainPhoto": "https://s3-us-west-1.amazonaws.com/moovi-photos/5.jpg",
//   "photos": [
//       "https://s3-us-west-1.amazonaws.com/moovi-photos/0001.jpg",
//       "https://s3-us-west-1.amazonaws.com/moovi-photos/0002.jpg",
//       "https://s3-us-west-1.amazonaws.com/moovi-photos/0003.jpg",
//       "https://s3-us-west-1.amazonaws.com/moovi-photos/15.jpg",
//       "https://s3-us-west-1.amazonaws.com/moovi-photos/5.jpg"
//   ],
//   "genre": "Drama",
//   "releaseDate": "DECEMBER 4, 2000",
//   "synopsis": "In non laudantium iusto. Occaecati omnis in et odit adipisci aut. Atque reprehenderit distinctio. Sint non quia necessitatibus id aperiam laborum voluptatem modi rem. Similique dignissimos ab quia doloribus id."
// }

app.post('/api/movies/:movieId/summary', (req, res) => {
  db.create(req, res);
});

app.put('/api/movies/:movieId/summary', (req, res) => {
  db.modify(req, res);
});

app.delete('/api/movies/:movieId/summary', (req, res) => {
  const { query } = req.body;
  db.delete(query, res);
  res.end('DELETE RECEIVED');
});


module.exports = app;
