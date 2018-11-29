
const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ 
  contactPoints: ['3.17.63.47'],
  keyspace: 'luantran',
});
// const client = new cassandra.Client({ contactPoints: ['172.17.0.2'], keyspace: 'luantran' });

module.exports = client;
