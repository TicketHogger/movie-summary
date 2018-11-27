
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['127.0.0.1'], keyspace: 'luantran' });
// const client = new cassandra.Client({ contactPoints: ['172.17.0.2'], keyspace: 'luantran' });

module.exports = client;
