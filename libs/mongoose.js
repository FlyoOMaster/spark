'use strict'
var mongoose = require('mongoose'),
    log = require('./winston'),
    dbConf = require('../config').DB,
    Tarif = require('../models/tarif_model');

var db = mongoose.connection;
db.on('open', function(){
    console.log("Connect to DataBase success");
    Tarif.findOne({name:'Standart'}, function(err, standart){
        if(err) throw err;
        if(!standart){
            standart = new Tarif({
                name:'Standart',
                label:'Стандарт',
                price:250,
                speed:5
            });
            standart.save();
        }
    })
});

var connectWithRetry = function(){
    mongoose.connect(dbConf.uri, function(err){
        if(err){
            log.error(err)
            log.info('Reconnect after '+dbConf.reconnect/1000 + ' seconds');
            setTimeout(connectWithRetry, dbConf.reconnect);
        }
    });
};
connectWithRetry();
module.exports = mongoose;
