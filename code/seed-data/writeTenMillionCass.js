const faker = require('faker');
const fs = require('fs');
const path = require('path');

const genres = ['Horror', 'Comedy', 'Action', 'Drama', 'Documentary', 'Adult', 'Animation'];
const releaseDate = ['OCTOBER 5, 2017', 'DECEMBER 4, 2000', 'NOVEMBER 20, 1996', 'FEBRUARY 25, 2002', 'MAY 20, 2018', 'SEPTEMBER 4, 1992', 'AUGUST 23, 2010'];
const rating = ['R', 'PG-13', 'PG', 'G', 'NC-17'];
const duration = ['2 hr 15 min', '3 hr 5 min', '1 hr 30 min', '2 hr 45 min', '5 hr 10 min', '10 hr 55min'];

let photos = [];

for (let i = 0; i < 1000; i += 1) {
  photos.push(`https://s3-us-west-1.amazonaws.com/hopping-couch-images/SDC-images/generated-data/dog${i}.png`);
}

const numData = 10000000;
let i = 7576563;
let movie;
let canWrite = true;

const generateGroupPhotos = (n) => {
  let groupPhotos = [];
  for (let i = 0; i < n; i += 1) {
    groupPhotos.push(photos[Math.floor(Math.random() * photos.length)]);
  }
  return groupPhotos;
};
const stream = fs.createWriteStream(path.join(__dirname, 'summariesCassandra.csv'));

//insert into luantran.movies JSON '{"movie_id":"1","title":"ab sed eum","score":"88","duration":"2 hr 15 min","rating":"G","mainPhoto":"https://s3-us-west-1.amazonaws.com/hopping-couch-images/SDC-images/generated-data/dog0.png","photos":["https://s3-us-west-1.amazonaws.com/hopping-couch-images/SDC-images/generated-data/dog335.png","https://s3-us-west-1.amazonaws.com/hopping-couch-images/SDC-images/generated-data/dog473.png","https://s3-us-west-1.amazonaws.com/hopping-couch-images/SDC-images/generated-data/dog20.png"],"genre":"Drama","releaseDate":"\"SEPTEMBER 4, 1992\"","synopsis":"Corrupti quas reiciendis dolores non numquam quaerat molestiae. Repellat pariatur officiis et modi aperiam est. Voluptatem in officiis. Nobis iure et ut ipsum pariatur et officiis aut voluptatem. Labore magnam aliquid eos. Distinctio labore animi ipsum enim necessitatibus explicabo est occaecati."}';

const write = (num) => {
  while (i < num && canWrite) {
    movie = {};
    movie.movie_id = `${i + 1}`; // movieId
    movie.title = `${faker.lorem.words()}`; // title
    movie.score = `${Math.floor(Math.random() * 100)}`; // id score
    movie.duration = `${duration[Math.floor(Math.random() * 6)]}`; // duration
    movie.rating = `${rating[Math.floor(Math.random() * 5)]}`; // rating
    movie.mainPhoto = `${photos[Math.floor(Math.random() * 5)]}`; // mainPhoto
    movie.photos = generateGroupPhotos(5); // photos
    movie.genre = `${genres[Math.floor(Math.random() * 7)]}`; // genre
    movie.releaseDate = `"${releaseDate[Math.floor(Math.random() * 7)]}"`; // releaseDate escaped
    movie.synopsis = `${faker.lorem.paragraph()}`; // synopsis
    canWrite = stream.write(`${JSON.stringify(movie)}\n`);

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
