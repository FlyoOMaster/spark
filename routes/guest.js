var HttpError = require('../error').HttpError,
    User = require('../models/user_model'),
    Request = require('../models/request_model'),
    Tarif = require('../models/tarif_model'),
    AuthError = require('../error').AuthError,
    log = require('../libs/winston'),
    async = require('async');
module.exports = {

    index:function(req, res, next){
        if(!req.session.views)
            req.session.views = 0;
        req.session.views++;
        res.render('index', {views:req.session.views});
    },
    about:function(req, res, next){
        res.render('about');
    },
    news:function(req, res, next){
        res.render('news');
    },
    shares:function(req, res, next) {
        res.render('shares');
    },
    prices:function(req, res, next) {
        Tarif.find({isActive:true},function(err, tarifs){
            if(err) return next(err);
            res.render('prices', {tarifs:tarifs});
        })
    },
    tv:function(req, res, next) {
        res.render('tv');
    },
    pay:function(req, res, next) {
        res.render('pay');
    },
    help:function(req, res, next) {
        res.render('help');
    },
    contacts:function(req, res, next) {
        res.render('contacts');
    },
    auth:function(req, res, next){
        res.render('auth');
    },
    registartionForm:function(req, res, next){
        res.render('registration');
    },
    registration:function(req, res, next){
        var user = new User(req.body.user),
            login,
            request;
        log.info(user.login+' want register');
        async.waterfall([
            function(cb){
                user.save(cb)
            },
            function(user, data, cb){
                log.info(user.login+' success save in db');
                async.waterfall([
                    function(cb2){
                        Tarif.findOne({name:'Standart'}, cb2);
                    },
                    function(tarif, cb2){
                        log.info(tarif.name+' has been found');
                        var req = new Request({
                            user: user._id,
                            tarif: tarif._id,
                            address: user.address[0].label
                        });
                        request = req;
                        req.save(cb2);
                    },
                    function(request, data, cb2){
                        log.info('Request on address '+ request.address+' saved');
                        login = user.login;
                        user.address[0].request = request._id;
                        user.isRegistered = true;
                        user.save(cb2);
                    }
                ], cb)
            }

        ],function(err, user){
            if (err){
                var test = typeof err;
                if(err.name == 'MongoError'){
                    reg = /\$[A-Za-z]+/gi;
                   switch(err.code){
                       case 11000:
                           var duplicate_key = err.message.match(reg)[0].substr(1);
                           var message = 'Пользователь с таким '+duplicate_key+' уже зарегистрирован';
                           log.info(user.login +": "+ message);
                           next(new HttpError(422, message));
                           break;
                       default :
                           break;
                   }
                }
                if(err.name == 'ValidationError'){
                    for(var error in err.errors){
                        log.info(user.login +": "+ err.errors[error].message);
                        next(new HttpError(422, err.errors[error].message));
                    }
                }
                if(user){
                    User.remove({login:login});
                }
                Request.remove(request, function(err, data){
                    var a = 0;
                });
            }else{
                log.info(user.login+' registered success');
                user.rememberInSessions(req);
                res.send('/cabinet/private/'+user.login);
            }
        })
    },
    authRequest:function(req, res, next){
        var user = req.body.user;
        User.authorization(user, function(err, user){
            if(err){
                if(err instanceof AuthError){
                    return next(err);
                }else
                {
                    return next(err);
                }
            }
            user.rememberInSessions(req);
            res.send(user._id);
        });
    }
}