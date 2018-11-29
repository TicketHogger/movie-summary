
const cassandra = require('cassandra-driver');
const DB_HOST = process.env.DB_HOST || '172.31.41.197';
const client = new cassandra.Client({ 
  contactPoints: [DB_HOST + ''],
  keyspace: 'luantran',
});

module.exports = client;
