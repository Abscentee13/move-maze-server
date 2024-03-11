require('dotenv').config();

module.exports = {
  dbConnectionSettings: Object.freeze({
    connectionLimit: 10,
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'test',
  }),
};
