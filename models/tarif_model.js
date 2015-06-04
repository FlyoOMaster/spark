var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var TarifSchema = new Schema({
    name:{
        type:String,
        require: true,
        unique:true
    },
    label:{
        type:String,
        require: true,
        unique:true
    },
    price:Number,
    speed:Number,
    isActive:{
        type:Boolean,
        default:true
    }
});

module.exports = mongoose.model('Tarif', TarifSchema);