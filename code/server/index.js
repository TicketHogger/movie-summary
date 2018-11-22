const app = require('./server.js');

const port = 3007;
app.listen(port, () => {
  console.log('listening at port', port);
});
