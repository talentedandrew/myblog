var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

//User Schema
var UserSchema = mongoose.Schema({
    firstname : {
        type : String
    },
    lastname : {
         type : String
    },
    email :{
        type : String
    },
    contact : {
        type : Number
    },
    password : {
        type : String, select: false
    },
    role :{
        type : String
    }

});

var User = module.exports = mongoose.model('User',UserSchema);
module.exports.createUser = function(newUser,callback){
    bcrypt.genSalt(10,function(err,salt){
        bcrypt.hash(newUser.password, salt, function(err, hash){
            newUser.password = hash;
            newUser.save(callback);
        });
    });
};
module.exports.getUserByemail = function(email,callback){
    User.findOne({ email: email },callback); 
};
module.exports.getUserById = function(id,callback){
    User.findById({ email: email },callback); 
};
module.exports.comparePassword = function(password,hash,callback){
    bcrypt.compare(password,hash,function(err,isMatch){
        if(err) throw err;
        callback(null,isMatch);
    });
};
module.exports.getUserById = function(){

};