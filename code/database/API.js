const client = require('./cassandra-driver');

const query = {
  getId: 'SELECT * from movies WHERE movie_id = ?',
  getTitle: 'SELECT * from movies WHERE title = ?',
  create: 'INSERT INTO movies JSON ?',
};


module.exports.getId = (id, cb) => {
  console.log('movie_id:', id);
  client.execute(query.getId, [id], { prepare: true })
    .then((result) => {
      const { rows } = result;
      cb(rows);
    });
};

module.exports.getTitle = (title, cb) => {
  console.log('title:', title);
  client.execute(query.getTitle, [title], { prepare: true })
    .then((result) => {
      const { rows } = result;
      cb(rows);
    });
};

module.exports.create = (record, cb) => {
  console.log(JSON.stringify(record));
  client.execute(query.create, [JSON.stringify(record)], { parse: true })
    .then((result) => {
      cb(result);
    })
    .catch((err) => {
      throw err;
    });
};
