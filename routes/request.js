var async = require('async'),
    HttpError = require('../error').HttpError,
    Request = require('../models/request_model'),
    Tarif = require('../models/tarif_model'),
    User = require('../models/user_model');

module.exports = {
    requestList:function(req, res, next){
        async.waterfall([
                function(cb){
                    User.findById(req.session.userId, cb);
                },
                function(user, cb){
                    if(user){
                        if(user.type != 'admin'){
                            Request.find({user:req.session.userId})
                                .populate('tarif')
                                .exec(cb);
                        }else{
                            Request.find()
                                .populate('user')
                                .populate('tarif')
                                .exec(cb);
                        }
                    }else{
                        cb(new HttpError(404, 'User not found'))
                    }
                }
            ],
            function(err, requests){
                if(err) return next(err);
                requests.sort(function(a, b){
                    return a.progress - b.progress;
                })
                res.render('cabinet/requests/index', {requests:requests});
            });
    },
    newRequest:function(req, res, next){
        Tarif.find({}, function(err, tarifs){
            if(err) return next(err);
            res.render('cabinet/requests/new', {tarifs:tarifs});
        });
    },
    addRequest:function(req, res, next) {
        var request = new Request(req.body.request);
        request.user = req.session.userId;
        request.save(function(err){
            if(err){
                if(err.code === 11000){
                    return next(new HttpError(500, 'Подключение на данный адресс уже осуществленно'))
                }
                return res.sendHttpError(err);
            }
            User.findById(req.session.userId, function(err, user){
                if(err) return next(err);
                user.address.push({
                    label:request.address,
                    tarif:request.tarif._id,
                    request:request._id
                });
                user.save(function(err){
                    if(err) return next(err);
                    res.send(200);
                })
            });

        });
    },
    closeRequest:function(req, res, next){
        var request_id = req.body.request_id,
            user_id = req.body.user_id;
        async.waterfall([
            function(cb){
                Request.findById(request_id)
                    .populate('user')
                    .exec(cb);
            },
            function(request, cb){
                var user = request.user;
                for(var i = 0; i < user.address.length; i++){
                    var address = user.address[i],
                        tmp = address.request;
                    if(address.request.equals(request_id)){
                        request.status = 'Complete';
                        address.tarif = request.tarif;
                    }
                }
               async.parallel([
                   function(cb2){user.save(cb2)},
                   function(cb2){request.save(cb2)}
               ],cb)
            }
        ],function(err, result){
            if(err) return next(err);
            res.send(200);
        })
        //async.waterfall([
        //    function(cb){
        //        User.findById(user_id, function(err, user){
        //            for(var address in user.address){
        //                if(address.request.equals(request_id)){
        //
        //                }
        //            }
        //        })
        //    },
        //    function(modified, cb){
        //        Request.update({tarif:request_id}, {status:'Complete'}, cb);
        //    }
        //],function(err){
        //    if(err) return next(err);
        //    res.send(200);
        //});
    }
}