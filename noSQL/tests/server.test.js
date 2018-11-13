const request = require('supertest');
const app = require('../server/server.js');

xtest('testing if get request is successful and of type json', () => {
  request(app)
    .get('/api/movies/9/summary')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err) => {
      if (err) console.log(err.message);
    })
    .catch(err => console.log(err));
});
