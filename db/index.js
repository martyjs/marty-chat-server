var path = require('path');
var DB = require('super-simple-db');
var path = process.argv[2] || path.join(__dirname, 'blob.json');

console.log('Messages saved to', path);

module.exports = new DB(path);