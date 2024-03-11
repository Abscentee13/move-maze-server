const { usersRepo } = require('./../repos/users');
const { HttpException } = require('./../classes/http-error');

/**
 * Retrieves a user by their ID.
 *
 * @param {number} userId - The ID of the user to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the user object.
 */
const getUserById = async (userId) => {
  const user = await usersRepo.getUserById(userId);

  if (!user) {
    throw HttpException.NotFound('User not found');
  }

  return user;
};

/**
 * Retrieves all users from the database.
 *
 * @param {Object} options - The options for retrieving users.
 * @param {number} [options.limit=30] - The maximum number of users to retrieve.
 * @param {number} options.page - The current page number for pagination.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of user objects.
 */
const getAllUsers = async ({ limit = 30, page = 1 }) =>
  await usersRepo.getAllUsers({ limit, page });

/**
 * Creates a new user in the database.
 *
 * @param {Object} newUserData - The data of the new user.
 * @returns {Promise<Object>} - A promise that resolves to the newly created user object.
 */
const createUser = async (newUserData) => {
  // Business logic validation
  //...
  try {
    return await usersRepo.createUser(newUserData);
  } catch (error) {
    throw HttpException.BadRequest('Error creating user');
  }
};

/**
 * Updates a user's data in the database.
 *
 * @param {number} userId - The ID of the user to update.
 * @param {Object} newUserData - The new data to update for the user.
 * @returns {Promise<Object|null>} - A promise that resolves to the updated user object if
 * the update was successful, or null if no rows were affected.
 */
const updateUser = async (userId, newUserData) => {
  // Business logic validation
  if ((await usersRepo.getUserById(userId)) === null) {
    throw HttpException.NotFound('User not found');
  }
  //...

  try {
    return await usersRepo.updateUser(userId, newUserData);
  } catch (error) {
    throw HttpException.BadRequest('Error updating user');
  }
};

/**
 * Deletes a user from the database.
 * @param {number} userId - The ID of the user to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the user was deleted
 * successfully, false otherwise.
 */
const deleteUser = async (userId) => {
  // Business logic validation
  if ((await usersRepo.getUserById(userId)) === null) {
    throw HttpException.NotFound('User not found');
  }
  //...

  try {
    return await usersRepo.deleteUser(userId);
  } catch (error) {
    throw HttpException.BadRequest('Error deleting user');
  }
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
const getActiveUsers = async ({ limit = 30, page }) =>
  await usersRepo.getActiveUsers({ limit, page });

module.exports.userService = {
  getUserById,
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getActiveUsers,
};
