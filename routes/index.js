var express = require('express'),
    User = require('../models/user_model'),
    guest = require('./guest'),
    request = require('./request'),
    tarif = require('./tarif'),
    user = require('./user');

var cabinetRouter = express.Router();
var commonRouter = express.Router();

    commonRouter.all('*', user.loadUser);
    commonRouter.get('/', guest.index)
        .get('/about', guest.about)
        .get('/news', guest.news)
        .get('/shares', guest.shares)
        .get('/prices', guest.prices)
        .get('/tv', guest.tv)
        .get('/pay', guest.pay)
        .get('/help', guest.help)
        .get('/contacts', guest.contacts)
        .get('/logout', user.logout)
        .get('/rm', function(req, res, next){
            User.removeAllRequests(function(err){
                if(err) return next(err);
                res.redirect('/');
            })
        })
    commonRouter.route('/registration')
            .get(guest.registartionForm)
            .post(guest.registration);
    commonRouter.route('/auth')
        .get(guest.auth)
        .post(guest.authRequest);

    // home = /cabinet
    cabinetRouter.all('*', user.authCheck);
    cabinetRouter.all('/tarifs', user.adminCheck);

    cabinetRouter.route('/private/:login')
        .get(user.getPrivate)
        .put(user.updatePrivate);
    cabinetRouter.route('/requests')
        .get(request.requestList)
        .put(request.closeRequest);
    cabinetRouter.route('/requests/new')
        .get(request.newRequest)
        .post(request.addRequest);
    cabinetRouter.get('/tarifs', tarif.getTarifs);
    cabinetRouter.route('/tarifs/new')
        .get(tarif.newTarif)
        .post(tarif.create);
    cabinetRouter.route('/tarifs/:id')
        .get(tarif.show)
        .delete(tarif.destroy)
        .put(tarif.update);




module.exports = function(app){
    app.use(commonRouter);
    app.use('/cabinet',cabinetRouter);

};
