

COPY movies(title, score, duration, rating, "mainPhoto", genre, "releaseDate", synopsis)
FROM '/Users/luantran/Documents/SDC/movie-summary/code/seed-data/summaries.csv' DELIMITER ',' CSV HEADER;

COPY photos("photoUrl","movieId") 
FROM '/Users/luantran/Documents/SDC/movie-summary/code/seed-data/imageUrls.csv' DELIMITER ',' CSV;

