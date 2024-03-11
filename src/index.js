const { createServer } = require('http');

const { appSettings } = require('./configs');
const { bootstrapApp } = require('./express-app');
const { DEVELOPMENT } = require('./constants/envs');

const { dbConnection } = require('./adapters/mysql');

// Ensure database connection is established
(async () => {
  const app = require('express')();

  const server = createServer(app);

  // KEEP-ALIVE CONFIGURATION SETUP ===================================================
  /* Ensure all inactive connections are terminated by the ALB,
         by setting this a few seconds higher than the ALB idle timeout */
  server.keepAliveTimeout = 30000;
  /*  Ensure the headersTimeout is set higher than the keepAliveTimeout
             due to this nodejs regression bug: https://github.com/nodejs/node/issues/27363 */
  server.headersTimeout = 31000;

  bootstrapApp(app);

  // Append event handlers =================================================
  server.on('error', async (error) => {
    // @ts-ignore
    if (error.syscall !== 'listen') {
      console.error({ error });
      throw error;
    }

    // @ts-ignore
    switch (error.code) {
      case 'EACCES': {
        console.error({
          error: new Error(
            `Port ${appSettings.port} requires elevated privileges`,
          ),
        });
        process.exit(1);
        break;
      }

      case 'EADDRINUSE': {
        console.error({
          error: new Error(`Port ${appSettings.port} is already in use`),
        });
        process.exit(1);
        break;
      }

      default:
        console.error({ error });
        throw error;
    }
  });

  // on interruption
  server.on('SIGINT', () => {
    console.info('Process was interrupted by SIGINT signal.');
  });

  // on termination
  server.on('SIGTERM', () => {
    console.info('Process was terminated by SIGTERM signal.');
  });

  server.on('listening', () => {
    if (process.env.NODE_ENV === DEVELOPMENT) {
      // @ts-ignore
      const { port: _port } = server.address();

      console.log(
        `Application available on: http://${appSettings.host}:${_port}/`,
      );
    }
  });

  // Listen on port, server initialized ===================================
  server.listen(appSettings.port, appSettings.host);

  /**
   * @see {@link https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/catchunhandledpromiserejection.md Handle unhandled errors}
   */
  // eslint-disable-next-line no-unused-vars
  process.on('unhandledRejection', (reason, _promise) => {
    // eslint-disable-next-line max-len
    // Caught an unhandled promise rejection, since we already have fallback handler for unhandled errors (see below), let throw and let him handle that

    throw reason;
  });

  process.on('uncaughtException', (error) => {
    // eslint-disable-next-line max-len
    // Received an error that was never handled, time to handle it and then decide whether a restart is needed

    console.error({
      error: {
        stack: error.stack,
        message: `Uncaught exception: ${error.message}.`,
      },
      payload:
        error.constructor !== Error ? JSON.stringify(error, null, 4) : null,
    });

    console.warn('Exiting program due to uncaught exception');
    process.exit(1);
  });

  // Close database connection on exit
  // eslint-disable-next-line no-unused-vars
  process.on('exit', (_code) => dbConnection?.destroy());
})();
