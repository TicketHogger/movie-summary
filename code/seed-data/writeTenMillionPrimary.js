const faker = require('faker');
const fs = require('fs');
const path = require('path');

const genres = ['Horror', 'Comedy', 'Action', 'Drama', 'Documentary', 'Adult', 'Animation'];
const releaseDate = ['OCTOBER 5, 2017', 'DECEMBER 4, 2000', 'NOVEMBER 20, 1996', 'FEBRUARY 25, 2002', 'MAY 20, 2018', 'SEPTEMBER 4, 1992', 'AUGUST 23, 2010'];
const photos = ['https://s3-us-west-1.amazonaws.com/moovi-photos/0001.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0002.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/0003.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/15.jpg', 'https://s3-us-west-1.amazonaws.com/moovi-photos/5.jpg'];
const rating = ['R', 'PG-13', 'PG', 'G', 'NC-17'];
const duration = ['2 hr 15 min', '3 hr 5 min', '1 hr 30 min', '2 hr 45 min', '5 hr 10 min', '10 hr 55min'];


const numData = 10 * 1000000;
let i = 0;
let str;
let canWrite = true;

const stream = fs.createWriteStream(path.join(__dirname, 'summaries.csv'));
stream.write('title, score, duration, rating, mainPhoto, photos, genre, releaseDate, synopsis\n'); // Cassandra doesnt need headers but need id 

const write = (num) => {
  while (i < num && canWrite) {
    str = '';
    str += `${i + 1},`;
    str += `${faker.lorem.words()},`; // title
    str += `${Math.floor(Math.random() * 100)},`; // id score
    str += `${duration[Math.floor(Math.random() * 6)]},`; // duration
    str += `${rating[Math.floor(Math.random() * 5)]},`; // rating
    str += `${photos[Math.floor(Math.random() * 5)]},`; // mainPhoto
    str += `${genres[Math.floor(Math.random() * 7)]},`; // genre
    str += `"${releaseDate[Math.floor(Math.random() * 7)]}",`; // releaseDate escaped
    str += `${faker.lorem.paragraph()}\n`; // synopsis
    canWrite = stream.write(str);

    i += 1;
    console.log(`${(i / num * 100).toFixed(2)}%`);
  }

  if (i < num) {
    canWrite = true;
    stream.once('drain', () => write(num));
  } else {
    stream.end();
    console.log(`Done seeding ${num} primary data points !`);
  }
};

write(numData);
