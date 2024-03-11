const { promisedQuery } = require('../adapters/mysql');

/**
 * Retrieves a game by it's ID.
 *
 * @param {number} gameId - The ID of the game to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the game object.
 */
const getGameById = async (gameId) =>
  await promisedQuery({
    sql: 'SELECT * FROM games WHERE id = ?;',
    timeout: 10_000,
    values: [gameId],
  });

/**
 * Retrieves all games from the database.
 *
 * @param {Object} options - The options for retrieving games.
 * @param {number} [options.limit=30] - The maximum number of games to retrieve.
 * @param {number} [options.offset=0] - The offset for pagination.
 * @param {number} options.page - The current page number for pagination.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of game objects.
 */
const getAllGames = async ({ limit = 30, offset = 0, page }) =>
  await promisedQuery({
    sql: 'SELECT * FROM games LIMIT ? OFFSET ?;',
    timeout: 10_000,
    values: [limit, page ? (page - 1) * limit : offset],
  });

/**
 * Creates a new game in the database.
 *
 * @param {Object} newGameData - The data of the new game.
 * @returns {Promise<Object>} - A promise that resolves to the newly created game object.
 */
const createGame = async (newGameData) => {
  const result = await promisedQuery({
    sql: 'INSERT INTO games SET ?;',
    timeout: 10_000,
    values: [newGameData],
  });

  return { id: result.insertId, ...newGameData };
};

/**
 * Updates a game's data in the database.
 *
 * @param {number} id - The ID of the game to update.
 * @param {Object} newGameData - The new data to update for the game.
 * @returns {Promise<Object|null>} - A promise that resolves to the updated game object if
 * the update was successful, or null if no rows were affected.
 */
const updateGame = async (id, newGameData) => {
  const result = await promisedQuery({
    sql: 'UPDATE games SET ? WHERE id = ?;',
    timeout: 10_000,
    values: [newGameData, id],
  });

  return result.affectedRows > 0 ? { id, ...newGameData } : null;
};

/**
 * Deletes a game from the database.
 * @param {number} gameId - The ID of the game to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the game was deleted
 * successfully, false otherwise.
 */
const deleteGame = async (gameId) => {
  const result = await promisedQuery({
    sql: 'DELETE FROM games WHERE id = ?;',
    timeout: 10_000,
    values: [gameId],
  });

  return result.affectedRows > 0;
};

module.exports.gamesRepo = {
  getGameById,
  getAllGames,
  createGame,
  deleteGame,
  updateGame,
};
