const { promisedQuery } = require('../adapters/mysql');

/**
 * Retrieves a user by their ID.
 *
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
const getUserById = async (userId) =>
  await promisedQuery({
    sql: 'SELECT * FROM users WHERE id = ?;',
    timeout: 10_000,
    values: [userId],
  });

/**
 * Retrieves all users from the database.
 *
 * @param {Object} options - The options for retrieving users.
 * @param {number} [options.limit=30] - The maximum number of users to retrieve.
 * @param {number} [options.offset=0] - The offset for pagination.
 * @param {number} options.page - The current page number for pagination.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of user objects.
 */
const getAllUsers = async ({ limit = 30, offset = 0, page }) =>
  await promisedQuery({
    sql: 'SELECT * FROM users LIMIT ? OFFSET ?;',
    timeout: 10_000,
    values: [limit, page ? (page - 1) * limit : offset],
  });

/**
 * Creates a new user in the database.
 *
 * @param {Object} newUserData - The data of the new user.
 * @returns {Promise<Object>} - A promise that resolves to the newly created user object.
 */
const createUser = async (newUserData) => {
  const result = await promisedQuery({
    sql: 'INSERT INTO users SET ?;',
    timeout: 10_000,
    values: [newUserData],
  });

  return { id: result.insertId, ...newUserData };
};

/**
 * Updates a user's data in the database.
 *
 * @param {number} id - The ID of the user to update.
 * @param {Object} newUserData - The new data to update for the user.
 * @returns {Promise<Object|null>} - A promise that resolves to the updated user object if
 * the update was successful, or null if no rows were affected.
 */
const updateUser = async (id, newUserData) => {
  const result = await promisedQuery({
    sql: 'UPDATE users SET ? WHERE id = ?;',
    timeout: 10_000,
    values: [newUserData, id],
  });

  return result.affectedRows > 0 ? { id, ...newUserData } : null;
};

/**
 * Deletes a user from the database.
 * @param {number} userId - The ID of the user to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user was deleted
 * successfully, false otherwise.
 */
const deleteUser = async (userId) => {
  const result = await promisedQuery({
    sql: 'DELETE FROM users WHERE id = ?;',
    timeout: 10_000,
    values: [userId],
  });

  return result.affectedRows > 0;
};

/**
 * Retrieves active users from the database.
 *
 * @param {Object} options - The options for retrieving active users.
 * @param {number} [options.limit=30] - The maximum number of users to retrieve.
 * @param {number} [options.offset=0] - The offset for pagination.
 * @param {number} options.page - The page number for pagination.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of active users.
 */
const getActiveUsers = async ({ limit = 30, offset = 0, page }) =>
  await promisedQuery({
    sql: 'SELECT * FROM users WHERE last_visit >= NOW() - INTERVAL 15 MINUTE LIMIT ? OFFSET ?;',
    timeout: 10_000,
    values: [limit, page ? (page - 1) * limit : offset],
  });

module.exports.usersRepo = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getActiveUsers,
};
