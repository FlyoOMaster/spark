var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var RequestSchema = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require:true
    },
    address:{
        type:String,
        require: true,
        unique:true
    },
    tarif:{
        type:Schema.Types.ObjectId,
        ref:'Tarif',
        require:true
    },
    status:{
        type:String,
        default:"In progress"
    },
    date:{
        type:Date,
        default:Date.now
    }
});

RequestSchema.virtual('progress')
    .get(function(){
        if(this.status == 'In progress') return 0;
        if(this.status == 'Complete') return 1;
    });

var Request = mongoose.model('Request', RequestSchema);
Request.schema.path('address').validate(function(value){
    return value && value.length > 0;
}, 'Адресс не может быть пустым');
module.exports = Request;