const client = require('../database/cassandra-driver');
const fs = require('fs');
const readline = require('readline');

const records = fs.createReadStream('../seed-data/summariesCassandra.csv');

const stream = readline.createInterface({
  input: records,
});

const query = 'INSERT INTO luantran.movies JSON ?;';
let lineCounter = 0;
const lineTarget = 100;

stream.on('line', (line) => {
  if (line) {
    stream.pause();
    client.execute(query, [line], { prepare: true })
      .then((executeError) => {
        if (executeError)  return executeError;

        lineCounter += 1;

        if (lineCounter === lineTarget) {
          stream.close();
          client.shutdown();
        } else {
          stream.resume();
        }
      })
      .catch(err => console.error(err));
  }
});
  



