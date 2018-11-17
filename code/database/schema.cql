DROP KEYSPACE IF EXISTS luantran;

create keyspace luantran WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};

use luantran;

CREATE TABLE movies(
    movie_id int PRIMARY KEY,
    title text,
    score text,
    duration text,
    rating text,
    mainPhoto text,
    photos text,
    genre text,
    releaseDate text,
    synopsis text
    );


COPY movies (movie_id, title, score, duration, rating, mainPhoto, photos, genre,releaseDate, synopsis)  FROM '/Users/luantran/Documents/SDC/movie-summary/code/seed-data/summaries.csv' WITH HEADER = TRUE AND DELIMITER=',';