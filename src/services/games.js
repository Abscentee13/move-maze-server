const { gamesRepo } = require('./../repos/games');
const { HttpException } = require('./../classes/http-error');

/**
 * Retrieves a game by ID.
 *
 * @param {number} gameId - The ID of the game to retrieve.
 * @returns {Promise<Object>} A promise that resolves to the game object.
 */
const getGameById = async (gameId) => {
  const game = await gamesRepo.getGameById(gameId);

  if (!game) {
    throw HttpException.NotFound('Game not found');
  }

  return game;
};

/**
 * Retrieves all games from the database.
 *
 * @param {Object} options - The options for retrieving games.
 * @param {number} [options.limit=30] - The maximum number of games to retrieve.
 * @param {number} options.page - The current page number for pagination.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of game objects.
 */
const getAllGames = async ({ limit = 30, page = 1 }) =>
  await gamesRepo.getAllGames({ limit, page });

/**
 * Creates a new game in the database.
 *
 * @param {Object} newGameData - The data of the new game.
 * @returns {Promise<Object>} - A promise that resolves to the newly created game object.
 */
const createGame = async (newGameData) => {
  // Business logic validation
  //...
  try {
    return await gamesRepo.createGame(newGameData);
  } catch (error) {
    throw HttpException.BadRequest('Error creating game');
  }
};

/**
 * Updates a game's data in the database.
 *
 * @param {number} gameId - The ID of the game to update.
 * @param {Object} newGameData - The new data to update for the game.
 * @returns {Promise<Object|null>} - A promise that resolves to the updated game object if
 * the update was successful, or null if no rows were affected.
 */
const updateGame = async (gameId, newGameData) => {
  // Business logic validation
  if ((await gamesRepo.getGameById(gameId)) === null) {
    throw HttpException.NotFound('game not found');
  }
  //...

  try {
    return await gamesRepo.updateGame(gameId, newGameData);
  } catch (error) {
    throw HttpException.BadRequest('Error updating game');
  }
};

/**
 * Deletes a game from the database.
 * @param {number} gameId - The ID of the game to be deleted.
 * @returns {Promise<boolean>} - A promise that resolves to true if the game was deleted
 * successfully, false otherwise.
 */
const deleteGame = async (gameId) => {
  // Business logic validation
  if ((await gamesRepo.getGameById(gameId)) === null) {
    throw HttpException.NotFound('Game not found');
  }
  //...

  try {
    return await gamesRepo.deleteGame(gameId);
  } catch (error) {
    throw HttpException.BadRequest('Error deleting game');
  }
};

module.exports.gameService = {
  getGameById,
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
};
