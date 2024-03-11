/**
 * MySQL Adapter
 * @module adapters/mysql
 */

const mysql = require('mysql');
const { promisify } = require('node:util');
const { dbConnectionSettings } = require('../configs/database');

/**
 * MySQL connection pool
 * @type {mysql.Pool}
 */
const connectionsPool = mysql.createPool(dbConnectionSettings);

connectionsPool.on('connection', () =>
  console.log('Connection established to MySQL database'),
);

connectionsPool.on('error', (error) => {
  console.error('MySQL database error:', error);
});

module.exports = {
  /**
   * Escapes an identifier for use in a SQL query
   * @function
   * @param {string} value - The identifier to escape
   * @returns {string} The escaped identifier
   */
  escapeId: mysql.escapeId.bind(mysql),

  /**
   * Escapes a value for use in a SQL query
   * @function
   * @param {*} value - The value to escape
   * @returns {string} The escaped value
   */
  escape: mysql.escape.bind(mysql),

  /**
   * Promisified version of the `query` method of the MySQL connection pool
   * @function
   * @param {string} sql - The SQL query to execute
   * @param {Array} [values] - The values to replace placeholders in the query
   * @returns {Promise<Array>} A promise that resolves to the result of the query
   */
  promisedQuery: promisify(connectionsPool.query).bind(connectionsPool.query),

  /**
   * Promisified version of the `getConnection` method of the MySQL connection pool
   * @function
   * @returns {Promise<mysql.PoolConnection>} A promise that resolves to a MySQL connection
   */
  promisedConnection: promisify(connectionsPool.getConnection).bind(
    connectionsPool.getConnection,
  ),

  /**
   * Promisified version of the `end` method of the MySQL connection pool
   * @function
   * @returns {Promise<void>} A promise that resolves when the connection pool is closed
   */
  promisedDisconnect: promisify(connectionsPool.end).bind(connectionsPool.end),
};
