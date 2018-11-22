const faker = require('faker');
const fs = require('fs');
const path = require('path');

const genres = ['Horror', 'Comedy', 'Action', 'Drama', 'Documentary', 'Adult', 'Animation'];
const releaseDate = ['OCTOBER 5, 2017', 'DECEMBER 4, 2000', 'NOVEMBER 20, 1996', 'FEBRUARY 25, 2002', 'MAY 20, 2018', 'SEPTEMBER 4, 1992', 'AUGUST 23, 2010'];
let photos = [];

for (let i = 0; i < 1000; i += 1) {
  photos.push(`https://s3-us-west-1.amazonaws.com/hopping-couch-images/SDC-images/generated-data/dog${i}.png`);
}

const rating = ['R', 'PG-13', 'PG', 'G', 'NC-17'];
const duration = ['2 hr 15 min', '3 hr 5 min', '1 hr 30 min', '2 hr 45 min', '5 hr 10 min', '10 hr 55min'];

const generateGroupPhotos = (n) => {
  let groupPhotos = [];
  for (let i = 0; i < n; i += 1) {
    groupPhotos.push(photos[Math.floor(Math.random() * photos.length)]);
  }
  return groupPhotos.join(' ');
}
const numData = 10 * 1000000;
let i = 0;
let str;
let canWrite = true;

const stream = fs.createWriteStream(path.join(__dirname, 'imageUrls.csv'));
stream.write('photo_id, imageUrl, movieId \n'); // Cassandra doesnt need headers but need id 
const write = (num) => {
  while (i < num && canWrite) {
    const chunk = `${i + 1}, ${photos[i % 1000]},` + `${Math.floor(Math.random() * numData)}` + '\n';
    canWrite = stream.write(chunk);
    i += 1;

    console.log(`${(i / num * 100).toFixed(2)}%`);
  }

  if (i < num) {
    canWrite = true;
    stream.once('drain', () => write(num));
  } else {
    stream.end();
    console.log(`Done seeding ${num} secondary data points !`);
  }
};

write(numData);
