let mongoose= require('mongoose');
let validator = require('validator');/*look in to this section*/
const bcrypt = require('bcrypt');


let AccountSchema = new mongoose.Schema({
  email:{
    type:String,
    required:true,
    unique:true
    },

  username:{
    type:String,
    required: true,
    unique: true,
    trim:true
    },

  password:{

    type:String,
    required: true
  },

    passwordConfirmation:{
      type:String,
      required:true
    }

});

//this part authenticate input against database
AccountSchema.statics.authenticate = function(email,password, callback){
  /*
    1. Authenticate the user

      1. check if the user exists
      2.check if password is correct
  */
  Account.findOne({})
    .exec(function(err, account){
      if(err){
        return callback(err)
      }else if (!account){
         var err = new Error('User not found.');
         err.status = 401;
         return callback(err);
      }
      bcrypt.compare(password, account.password, function(err, result){
        if(result==true){
          return callback(null, account);
        }else{
          return callback();
        }
      })
    });
}

//hashing a password before saving it to the database
AccountSchema.pre('save', function(next){
  var user =this;
  bcrypt.hash(account.password, 10,function(err,hash){
    if(err){
      return next(err);
    }
    account.password= hash;
    next();
  })
});

var Account = mongoose.modal('accounts', AccountSchema);
module.exports = Account;
