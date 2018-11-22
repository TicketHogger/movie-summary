const fs = require('fs');
const csv =require('csv');
const generateData = require('../../seed-data/faker.js');
// const Movie = require('../index');

const numData = 10000000;


const parser = csv.parse({
  columns: true,
});

  const input = fs.createReadStream('summaries.csv');

  input.on('open', () => {
    input
      .pipe(csv.stringify())
      .pipe(parser)
      .pipe((val) => {
        console.log(val);
      });
  });

