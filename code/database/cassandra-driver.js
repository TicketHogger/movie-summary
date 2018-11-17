
const cassandra = require('cassandra-driver');


const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'luantran' });

client.connect( (err) => {
  if (err) return console.error(err);
  console.log('Connected to cluster with %d host(s): %j', client.hosts.length, client.hosts.keys());

  const createTable = `                  
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

  const query = `COPY movies (movie_id, title, score, duration, rating, mainPhoto, photo, genre,releaseDate, synopsis)  FROM '/Users/luantran/Documents/SDC/movie-summary/code/seed-data/summariesTest.csv' WITH HEADER = TRUE AND DELIMITER=',' ;`;

  client.execute(query)
    .then((err, results) => {
      if (err) return console.error(err);
      console.log(results);
    });
});
