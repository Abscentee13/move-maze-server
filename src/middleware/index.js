const envs = require('../constants/envs');

module.exports = {
  /**
   * @type {import('express').RequestHandler} Middleware
   */
  // @ts-ignore
  notFoundHandler: async (_, res) => res.sendStatus(410),

  /**
   * Error handling middleware, used as last middleware on chain
   * @type {import('express').ErrorRequestHandler} ErrorHandler
   * @returns {Promise<any>}
   */
  // eslint-disable-next-line no-unused-vars
  errorHandler: async (err, _req, res, _next) => {
    const { status, name, stack } = err;

    // eslint-disable-next-line no-console
    console.error(err);

    const payload =
      process.env.NODE_ENV === envs.DEVELOPMENT
        ? { statusCode: 500, message: name, stackTrace: stack }
        : {
            statusCode: status || 500,
            message: 'Whoops, looks like something went wrong...',
          };

    return res.status(status || 500).json(payload);
  },
};
