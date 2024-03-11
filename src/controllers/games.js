const { gameService } = require('../services/games');

const { IdSchema, gameSchema } = require('../validators');

/**
 * @api { GET } /games/:id/
 *
 * @description Get game by ID
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const getGameById = async (req, res, next) => {
  try {
    // Use the IdSchema to validate the ID
    const _id = await IdSchema.validateAsync(req.params.id, { convert: true });

    const game = await gameService.getGameById(_id);

    return res.json(game);
  } catch (error) {
    next(error);
  }
};

/**
 * @api { GET } /games/
 *
 * @description Get games list
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const getAllGames = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    if (!Number.isInteger(+page) || +page < 1) {
      throw HttpException.BadRequest('Invalid page number');
    }

    if (!Number.isInteger(+limit) || +limit < 1 || +limit > 100) {
      throw HttpException.BadRequest('Invalid limit');
    }

    const games = await gameService.getAllGames({ page: +page, limit: +limit });

    res.json(games);
  } catch (error) {
    next(error);
  }
};

/**
 * @api { POST } /games/
 *
 * @description Create game
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const createGame = async (req, res, next) => {
  try {
    const _game = await gameSchema.validateAsync(
      { ...req.body },
      { stripUnknown: true, presence: 'required' },
    );

    const newGame = await gameService.createGame(_game);

    res.status(201).json(newGame);
  } catch (error) {
    next(error);
  }
};

/**
 * @api { PUT } /games/:id/
 *
 * @description Update game
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const updateGame = async (req, res, next) => {
  try {
    // Use the IdSchema to validate the ID
    const _id = await IdSchema.validateAsync(req.params.id, { convert: true });

    const _game = await gameSchema.validateAsync(
      { ...req.body },
      { stripUnknown: true, presence: 'required' },
    );

    const updatedGame = await gameService.updateGame(_id, _game);

    res.json(updatedGame);
  } catch (error) {
    next(error);
  }
};

/**
 * @api { DELETE } /games/:id/
 *
 * @description Delete game
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const deleteGame = async (req, res, next) => {
  try {
    // Use the IdSchema to validate the ID
    const _id = await IdSchema.validateAsync(req.params.id, { convert: true });

    await gameService.deleteGame(_id);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

/**
 * @api { GET } /games/active/
 *
 * @description Get active games list
 * @param {import('express').Request} req  - extended express request object
 * @param {import('express').Response} res - extended express response object
 * @param {import('express').NextFunction} next - express next callback function
 */
const getActiveGames = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    if (!Number.isInteger(+page) || +page < 1) {
      throw HttpException.BadRequest('Invalid page number');
    }

    if (!Number.isInteger(+limit) || +limit < 1 || +limit > 100) {
      throw HttpException.BadRequest('Invalid limit');
    }

    const activeGames = await gameService.getActiveGames({
      page: +page,
      limit: +limit,
    });

    res.json(activeGames);
  } catch (error) {
    next(error);
  }
};

module.exports.gamesController = {
  getGameById,
  getAllGames,
  createGame,
  updateGame,
  deleteGame,
  getActiveGames,
};
