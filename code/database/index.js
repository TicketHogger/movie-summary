const Sequelize = require('sequelize');

const sequelize = new Sequelize('luantran','', '', {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});


const Photo = sequelize.define('photo', {
  photo_id:
    {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  photoUrl: Sequelize.TEXT,
  movieId: Sequelize.INTEGER,
}, { timestamps: false });


const Movie = sequelize.define('movie', {
  movie_id:
    {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  title: Sequelize.STRING,
  score: Sequelize.INTEGER,
  duration: Sequelize.STRING,
  rating: Sequelize.STRING,
  mainPhoto: Sequelize.STRING,
  // photos: Sequelize.INTEGER, // Switch this to Int tomorrow
  genre: Sequelize.STRING,
  releaseDate: Sequelize.STRING,
  synopsis: Sequelize.TEXT,
}, { timestamps: false });

// Photo.belongsTo(Movie, { foreignKey: 'movieId' });

Movie.sync({ force: true })
  .then(() => {
    Photo.sync({ force: true })
      .then(() => {
        sequelize.close();
      });
  });



module.Movie = Movie;
module.Photo = Photo;
