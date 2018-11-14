const fs = require('fs');
const request = require('request');
const amount = 1000;

const download = function (uri, filename, callback) {
  request.head(uri, (err, res, body) => {
  request(uri).pipe(fs.createWriteStream(filename)).on('finish', callback);
  });
};

for (let i = 0; i < amount; i += 1) {
  download('https://loremflickr.com/300/300/dog', `./generated-data/dog${i}.png`, () => {
    console.log('download ' + i + ' image \n');
  });
}
