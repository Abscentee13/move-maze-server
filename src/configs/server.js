require('dotenv').config();

module.exports = {
  appSettings: Object.freeze({
    host:
      process.env.APP_HOST ||
      (process.env.USE_LOCAL_IP ? '0.0.0.0' : 'localhost'),
    port: +process.env.APP_PORT || 3000,
  }),
};
