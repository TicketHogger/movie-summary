FROM mongo

COPY summaries.json /summaries.json

CMD mongoimport --host database --db movie-summary --file /summaries.json