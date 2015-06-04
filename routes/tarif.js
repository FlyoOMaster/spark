var Tarif = require('../models/tarif_model'),
    async = require('async'),
    HttpError = require('../error').HttpError;
module.exports = {
    show:function(req, res, next){
        var id = req.params.id;
        Tarif.findById(id, function(err, tarif){
            if(err) return next(err);
            res.render('cabinet/tarifs/show', {tarif:tarif});
        });
    },
    update:function(req, res, next){
        var id = req.params.id,
            updatedTarif = req.body.tarif;
        Tarif.update({_id:id}, updatedTarif, function(err, tarif){
            if(err) return next(err);
            res.sendStatus(200);
        });
    },
    getTarifs:function(req, res, next){
        Tarif.find({}, function(err, tarifs){
            if(err) return next(err);
            tarifs.sort(function(a,b){
                if(!a.isActive) return 1;
                if(!b.isActive) return 1;
                if(a.isActive) return -1;
                if(b.isActive) return -1;
                if(a.isActive && b.isActive) return 0;
            })
            res.render('cabinet/tarifs/index', {tarifs:tarifs});
        })
    },
    newTarif:function(req, res, next){
        res.render('cabinet/tarifs/new');
    },
    create:function(req, res, next){
        var tarif = new Tarif(req.body.tarif);
        tarif.save(function(err){
            if(err) return next(new HttpError(500, err.message));
            res.sendStatus(200);
        });
    },
    destroy:function(req, res, next){
        var id = req.params.id;
        async.waterfall(
            [
                function(cb){
                    Tarif.findOneAndRemove({_id:id}, cb);
                }
            ],
            function(err){
                if(err) return next(err);
                res.sendStatus(200);
            });
    }
}