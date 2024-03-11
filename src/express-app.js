const morgan = require('morgan');
const express = require('express');
require('express-async-errors');
const cookieParser = require('cookie-parser');

const { attachRouteHandlers } = require('./routes');

/**
 * Configure Express application
 * @param {import('express').Express} app - application instance
 * @returns {import('express').Express}
 */
module.exports.bootstrapApp = (app) => {
  app.disable('x-powered-by');

  // ===========================================================================
  // Parsers setup
  // ===========================================================================

  app.use(cookieParser());
  app.use(express.json({ limit: '5mb' }));
  app.use(express.urlencoded({ limit: '5mb', extended: true }));

  // ===========================================================================
  // Logging setup
  // ===========================================================================

  if (!+process.env.DISABLE_LOGS) {
    app.use(morgan('dev'));
  }

  // ===========================================================================
  // Setup routing
  // ===========================================================================
  attachRouteHandlers(app);

  return app;
};
