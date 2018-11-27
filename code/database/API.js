const client = require('./cassandra-driver');

const query = {
  getId: 'SELECT * FROM movies WHERE movie_id = ?',
  getTitle: 'SELECT * from movies WHERE title = ?',
  create: 'INSERT INTO movies JSON ?',
  delete: 'DELETE FROM movies WHERE movie_id = ?',
  put: 'UPDATE movies WHERE',
};


module.exports.getId = (id, cb) => {
  client.execute(query.getId, [id], { prepare: true })
    .then((result) => {
      const { rows } = result;
      cb(rows);
    });
};

module.exports.getTitle = (title, cb) => {
  client.execute(query.getTitle, [title], { prepare: true })
    .then((result) => {
      const { rows } = result;
      cb(rows);
    });
};

module.exports.create = (record, cb) => {
  client.execute(query.create, [JSON.stringify(record)], { prepare: true })
    .then((result) => {
      cb(result);
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.delete = (movieId, cb) => {
  client.execute(query.delete, [movieId], { prepare: true })
    .then((result) => {
      cb(result);
    })
    .catch((err) => {
      throw err;
    });
};

module.exports.put = (movieId, cb) => {



}