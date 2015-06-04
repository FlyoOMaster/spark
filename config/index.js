var winston = require('winston');
exports.DB = {
    uri:"mongodb://sparkDB:qwerty123456789@ds043002.mongolab.com:43002/spark",
    reconnect:3000
}
exports.logger = {
    transports: [
        new (winston.transports.Console)({
            colorize:true,
            timestamp:true
        }),
        new (winston.transports.File)({
            name: 'error',
            filename: './logs/errors.log',
            timestamp:true,
            level:'error'
        })
    ]
}
exports.Session = (function() {
    return {
        secret: "spark_yahooooo",
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: '/',
            httpOnly: true,
            secure: false,
            maxAge: null
        },
        store: require('../libs/mongoStore')
    }
})()
