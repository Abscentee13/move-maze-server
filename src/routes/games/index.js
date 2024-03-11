const express = require('express');
const gamesRouter = express.Router({ caseSensitive: true });

const { gamesController } = require('../../controllers/games');

gamesRouter
  // id starts from 1 and can be up to 9 digits long
  .route('/:id([1-9]\\d{0,8})/')
  .get(gamesController.getGameById)
  .post(gamesController.updateGame)
  .delete(gamesController.deleteGame);

gamesRouter
  .route('/')
  .get(gamesController.getAllGames)
  .post(gamesController.createGame);

module.exports = { gamesRouter };
