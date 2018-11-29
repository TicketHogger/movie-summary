const client = require('../database/cassandra-driver');
const fs = require('fs');
const readline = require('readline');

const records = fs.createReadStream('seed-data/summariesCassandra.csv');

const stream = readline.createInterface({
  input: records,
});

const query = 'INSERT INTO luantran.movies JSON ?;';
let lineCounter = 0;
const lineTarget = 10000000;

console.log('Begin seeding:');

stream.on('line', (line) => {
  if (line) {
    lineCounter += 1;
    console.log(`${(lineCounter / lineTarget * 100).toFixed(2)}%`);
    stream.pause();
    client.execute(query, [line], { prepare: true }, (error) => {
      if (error) throw error;
      if (lineCounter === lineTarget) {
        console.log('Done seeding');
        stream.close();
        client.shutdown();
      } else {
        stream.resume();
      }
    });
  }
});
