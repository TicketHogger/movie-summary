DROP KEYSPACE IF EXISTS luantran;

create keyspace luantran WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

use luantran;

CREATE TABLE movies(
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
    );


-- COPY movies (movie_id, title, score, duration, rating, mainPhoto, "photos", genre,releaseDate, synopsis)  FROM '/Users/luantran/Documents/SDC/movie-summary/code/seed-data/summariesCassandra.csv' WITH HEADER = TRUE AND DELIMITER=',';
COPY movies FROM '/Users/luantran/Documents/SDC/movie-summary/code/seed-data/summariesCassandra.csv' WITH HEADER = TRUE AND DELIMITER=',';

CREATE INDEX movies_title on movies(title);