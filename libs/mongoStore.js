var session = require('express-session'),
    mongoose = require('mongoose');

module.exports = (function(){
    var MongoStore = require('connect-mongo')(session)
    return new MongoStore({mongooseConnection:mongoose.connection});
})()

