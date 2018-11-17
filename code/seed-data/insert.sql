-- COPY public.movies(title,score,duration, rating, mainPhoto, photos, genre, releaseDate, synopsis) 
-- FROM '/Users/luantran/Documents/SDC/movie-summary/code/seed-data/summariesTest.csv' DELIMITER ',' CSV HEADER;

COPY movies(id, title, score, duration, rating, "mainPhoto", photo, genre, "releaseDate", synopsis)
FROM '/Users/luantran/Documents/SDC/movie-summary/code/seed-data/summaries.csv' DELIMITER ',' CSV;

