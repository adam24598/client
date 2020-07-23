const mongoose =require('mongoose');
const Schema =mongoose.Schema;
const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    mdp:{
        type: String,
        required:true

    },
    solde:{
        type:Number,
        required:true
    },
    role:{
        type:String,
        default:'user',
        enum:['user','admin' ]
    
    }
});
module.exports = User = mongoose.model('user',UserSchema);