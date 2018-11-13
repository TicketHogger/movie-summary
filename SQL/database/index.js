const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/movie-summary', { useNewUrlParser: true });

const getSummary = (cb) => {
  mongoose.connection.db.collection('summaries', (err, collection) => {
    if (err) cb(err);
    collection.find().toArray(cb);
  });
};

exports.getSummary = getSummary;
