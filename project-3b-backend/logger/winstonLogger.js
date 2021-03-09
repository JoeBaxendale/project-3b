const winston = require('winston');

const logger = winston.createLogger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'changes.log' }),

  ]
});
logger.info("winston");
module.exports= logger;
