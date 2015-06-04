'use strict'

var mongoose = require('mongoose'),
    ValidationError = mongoose.Error.ValidationError,
    ValidatorError  = mongoose.Error.ValidatorError,
    Schema = mongoose.Schema,
    Request = require('./request_model'),
    Tarif = require('./tarif_model'),
    glob = require('../global'),
    async = require('async'),
    util = require('util'),
    AuthError = require('../error').AuthError,
    crypto = require('crypto');

var UserSchema = new Schema({
    login: {
        type:String,
        require: true,
        unique:true
    },
    hashedPassword:{
        type:String,
        require:true
    },
    name: {
        type:String,
        require:true
    },
    middle_name: {
        type:String,
        require:true
    },
    last_name: {
        type:String,
        require:true
    },
    birthday : {
        type:String,
        require:true
    },
    //address: {
    //    type:String,
    //    require:true
    //},
    address: [
        {
            label:{
                type:String,
                unique:true
            },
            tarif:{
                type:Schema.Types.ObjectId,
                ref:'Tarif'
            },
            request:{
                type:Schema.Types.ObjectId,
                ref:'Request'
            }
        }
    ],
    phone: {
        type:String,
        require:true
    },
    //tarif: {
    //    type:Schema.Types.ObjectId,
    //    ref:'Tarif'
    //},
    //requests: [{
    //    type: Schema.Types.ObjectId,
    //    ref: 'Request'
    //}],
    salt : String,
    type : {
        type : String,
        default:null
    },
    isRegistered:{
        type:Boolean,
        default:false
    }
});
UserSchema.path('login').validate(function(value){
    return  value.length > 0;
}, 'Логин не должен быть пустым');
UserSchema.pre('save', function(next){
    var user = this;
    async.parallel([
        function(cb){
            if(!user.password && !user.isRegistered) {
                var error = new ValidationError(this);
                error.errors.password = {message: 'Пароль не может быть пустым'}
                return cb(error);
            }else{
                return cb();
            }

        },
        function(cb){
            if(user.address[0]) {
                for (var i = 0; i < user.address.length; i++) {
                    if (user.address[i].label.length == 0) {
                        var error = new ValidationError(this);
                        //var a = new ValidatorError('email', 'Email is not valid', 'notvalid', this.login);
                        error.errors.password = {message: 'Адрес не может быть пустым'}
                        return cb(error);
                    }
                }
            }
            return cb();
        }
    ],function(err){
        return next(err)
    });
});

UserSchema.statics.authorization = function(user, onComplete){
    var User = this;
    async.waterfall([
        function(cb){
            User.findOne({login:user.login}, cb);
        },
            function(findUser, cb){
                if(!findUser) return cb(new AuthError(404, "Пользователь не найден"))
                if(findUser.checkPassword(user.password)){
                    cb(null, findUser);
                }else
                {
                    cb(new AuthError(403, "Неверный логин или пароль"));
                }
            }
        ],
        function(err, user){
            if(err) return onComplete(err);
            onComplete(null, user);
        }
    )
}
UserSchema.virtual('password')
    .set(function(password){
    this._plainPassword = password;
    this.salt = glob.generateSalt();
    this.hashedPassword = this.encryptPassword(password);
    })
    .get(function(){
        return this._plainPassword;
    });

UserSchema.methods.encryptPassword = function(password){
    return crypto.createHash('sha1', this.salt).update(password).digest('hex');
};

UserSchema.methods.checkPassword = function(password){
    return this.hashedPassword == this.encryptPassword(password);
}

UserSchema.methods.rememberInSessions = function(req) {
    req.session.userId = this._id;
};

UserSchema.statics.removeAllRequests = function(cb){
    var User = this;
    async.parallel([
        function(cb2){
            Tarif.findOne({name:'Standart'}, cb2);
        },
        function(cb2){
            User.find({}, cb2);
        }
    ],function(err, result) {
        if (err) return cb(err);
        var users = result[1],
            tarif_standart = result[0];
        async.each(users, function (user, cb2) {
            for (var i = 0; i < user.address.length; i++) {
                if('request' in user.address[i]) {
                    var request_id = user.address[i].request;
                    Request.remove({_id: request_id}, function (err) {
                        if(err) cb2(err);
                    });
                }
            }
            user.address = [];
            user.save(cb2);
        }, cb)
    })
};
var User = mongoose.model('User', UserSchema);

module.exports = User;
