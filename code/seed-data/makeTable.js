const client = require('../database/cassandra-driver');

const dropQuery = `DROP KEYSPACE IF EXISTS luantran`;
const createQuery = `create keyspace luantran WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1}`;

const query = `CREATE TABLE movies(
    movie_id int,
    title text,
    score text,
    duration text,
    rating text,
    mainPhoto text,
    photos list <text>,
    genre text,
    releaseDate text,
    synopsis text,
    PRIMARY KEY (movie_id, title)
    )`;

client.execute(query)
  .then((result) => {
    console.log(result);
    return result;
  });
