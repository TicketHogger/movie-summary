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

CREATE INDEX movies_title on movies(title);