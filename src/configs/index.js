require('dotenv').config();

const dbConfig = require('./database');
const serverConfig = require('./server');

module.exports = Object.freeze({
  ...dbConfig,
  ...serverConfig,
});
