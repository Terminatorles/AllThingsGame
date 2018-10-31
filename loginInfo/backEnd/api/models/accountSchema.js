let mongoose= require('mongoose');
let validator = require('validator');
const bcrypt = require('bcrypt');


let accountSchema = new mongoose.Schema({
  Email:{
    type:String,
    required:true,
    unique:true
    },

  username:{
    type:String,
    required: true,
    unique: true
    },

  password:{

    type:String,
    required: true
    }


});


//this part authenticate input against database

accountSchema.statics.authenticate = function(Email,password, collback){
  /*
    1. Authenticate the user

      1. check if the user exists
      2.check if password is correct
  */
  account.findOne({})
    .exec(function(err, user){
      if(err){
        return callback(err)
      }else if (!user){
         var err = new Error('User not found.');
         err.status = 401;
         return callback(err)
      }

      bcrypt.compare(password, user.password, function(err, result){
        if(result==true){
          return callback(null, user);
        }else{
          return callback();
        }
      })
    });
}


//hashing a password before saving it to the database

accountSchema.pre('save', function(next){
  var user =this;
  bcrypt.hash(user.password, 10,function(err,hash){
    if(err){
      return next(err);
    }
    user.password= hash;
    next();
  })
});

var account = mongoose.modal('accounts', accountSchema)
module.exports = account;
