const { gamesRouter } = require('./games');
const { usersRouter } = require('./users');

const { errorHandler, notFoundHandler } = require('./../middleware');

/**
 * Configure Express application
 * @param {import('express').Express} app - application instance
 * @returns {import('express').Express}
 */
module.exports.attachRouteHandlers = (app) => {
  app.use('/api/games', gamesRouter);
  app.use('/api/users', usersRouter);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
};
