var User = require('../models/user_model'),
    Tarif = require('../models/tarif_model'),
    Request = require('../models/request_model'),
    HttpError = require('../error').HttpError,
    async = require('async');

module.exports = {
    loadUser:function(req, res, next){
        res.locals.user = null;
        var userId = req.session.userId;
        if(!userId) return next();
        User.findOne({_id:userId})
            .populate('address tarif address.request')
            .exec(function(err, user){
                if(err) return next(err);
                res.locals.user = user;
                next();
        });
    },
    authCheck:function(req, res, next){
        if(!req.session.userId) return res.redirect('/auth');
        next();
    },
    adminCheck:function(req, res, next){
        User.findById(req.session.userId, function(err, user) {
            if (err) next(err);
            if (user.type != 'admin') return res.redirect('/');
            next();
        });
    },
    logout:function(req, res, next){
        req.session.destroy();
        res.redirect('/');
    },
    getPrivate:function(req, res, next){
        var login = req.params.login;
        async.parallel([
            function(cb){
                User.findOne({login:login})
                    .populate('address.tarif address.request')
                    .exec(cb);
            },
             function(cb){
                 Tarif.find({},cb);
             }
        ],function(err, result){
            if(err) return next(err);
            var user = result[0],
                tarifs = result[1];
            res.render('cabinet/private', {foundUser : user, tarifs: tarifs});
        });
    },
    updatePrivate:function(req, res, next){
        var login = req.params.login,
            sessionUser = null;

        async.waterfall([
            function(cb){
                User.findById(req.session.userId, cb);
            },
            function(user, cb){
                sessionUser = user;
                User.findOne({login:login}, cb);
            },
            function(user, cb){
                var updateObj = req.body.user,
                    test = {};
                for(var val in updateObj){
                    if(!Array.isArray(updateObj[val])){
                        user[val] = updateObj[val];
                    }else{
                        for (var i = 0; i < updateObj[val].length; i++) {
                            for(var addressParam in updateObj[val][i]){
                                if('tarif' in updateObj[val][i]){
                                    user[val][i]['tarif'] = updateObj[val][i]['tarif'];
                                    test = updateObj[val][i]['tarif'];
                                }
                            }

                        }
                    }
                }
                if(user){
                    if(user.login == sessionUser.login || sessionUser.type == 'admin'){
                        user.save(cb);
                    }else{
                        cb(new HttpError(403, 'You does`t have permissions for update this user'));
                        }
                }else{
                    cb(new HttpError(404, "Update error. User not found"));
                }
            }
        ],function(err, user){
            if(err) return res.sendHttpError(err);
            res.send(200);
        })
    }
}