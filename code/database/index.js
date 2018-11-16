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
  id:
    {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,

    },
  photoUrl: Sequelize.STRING,
}, { timestamps: false });


const Movie = sequelize.define('movie', {
  id:
    {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  title: Sequelize.STRING,
  score: Sequelize.STRING,
  duration: Sequelize.STRING,
  rating: Sequelize.STRING,
  mainPhoto: Sequelize.STRING,
  photo: Sequelize.STRING,
  genre: Sequelize.STRING,
  releaseDate: Sequelize.STRING,
  synopsis: Sequelize.TEXT,
}, { timestamps: false });

Photo.sync({ force: true });

// Movie.belongsTo(Photo, { foreignKey: 'fk_photo' });

Movie.sync({ force: true });


module.Movie = Movie;
module.Photo = Photo;

