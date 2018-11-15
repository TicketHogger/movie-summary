const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movie-summary', { useNewUrlParser: true });
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

const summarySchema = new mongoose.Schema({
  id: Number,
  title: String,
  score: Number,
  duration: String,
  rating: String,
  mainPhoto: String,
  photos: Array,
  genre: String,
  releaseDate: String,
  synopsis: String,
});

const Summary = mongoose.model('Summary', summarySchema);

exports.getSummary = (cb) => {
  // mongoose.connection.db.collection('summaries', (err, collection) => {
  //   if (err) cb(err);
  //   collection.find().toArray(cb);
  // });

  Summary.find({})
    .then((summaries) => {
      console.log(summaries);
      cb(summaries);
    });
};

exports.modify = (req, res) => {

  const
    {
      title,
      score,
      duration,
      rating,
      mainPhoto,
      photos,
      genre,
      releaseDate,
      synopsis,
    } = req.body;

  // assume query is title
  Summary.findOneAndUpdate({ title }, {
    score,
    duration,
    rating,
    mainPhoto,
    photos,
    genre,
    releaseDate,
    synopsis,
  })
    .then((summary) => {
      res.end(summary);
    });
};

exports.delete = (query, res) => {
  Summary.findOneAndDelete({ title: query })
    .then((summary) => {
      res.json(summary);
    });
};

exports.create = (req, res) => {
  Summary.create(req.body)
    .then(() => {
      res.end('created!');
    });
};
