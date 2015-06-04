var winston = require('winston'),
    config = require('../config').logger;

var logger = new (winston.Logger)(config);

logger.info("Logger started");
module.exports = logger;