
const cassandra = require('cassandra-driver');

const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'luantran' });

client.connect( (err) => {
  if (err) return console.error(err);
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());

  const query = `                  
  CREATE TABLE movies(
    movie_id int PRIMARY KEY,
    title text,
    score text,
    duration text,
    rating text,
    mainPhoto text,
    photo text,
    genre text,
    releaseDate text,
    synopsis text
    )`;

  client.execute(query)
    .then((err, results) => {
      if (err) return console.error(err);
      console.log(results);
    });
});
