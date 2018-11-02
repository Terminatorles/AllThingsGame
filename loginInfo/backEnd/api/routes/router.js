var express = require('express');
var router  = express.router();
var Account = require('../models/accountSchema');

//get route for reading data

router.get('/', function(req, res, next){
  return res.sendFile(path.join(__dirname + '/frontEnd/loginPage.html'))
});


//post route for reading data
router.post('/', function(req, res, next){
  //confirm that user typed same passsword twice
  if (req.body.password != req.body.passwordConfirmation){
      var err = new Error('passwords do not Match, try again!');
      err.status =400;
      res.send("passwords don't Match");
      return next(err);
    }
    if (req.body.email &&
       req.body.username &&
       req.body.password &&
       req.body.passwordconfirmation){

      var userData ={
          email: req.body.email,
          username:req.body.username,
          password:req.body.password,
          passwordConfirmation:req.body.passwordConfirmation
        }

        //using the Schema one will insert data into the database
        Account.create(userData, function(err, account){
          if(err){
            return next(err)
            }  else {
              req.session,accountId = account._id;
              return res.redirect('/profile');
            }
          });
      } else if (req.body.logemail && req.body.logpassword){
        Accont.authenticate(req.body.logemail, req.body.logpassword, function(error, user){
          if (error || !account){

            var err = new Error('wrong email or password.');
            err.status = 401;
            return next(err);
          } else{
            req.session.accountId= account._id;
            return res.redirect('/profile');
          }
        })


      } else{
        var err = new Error('all fields required');
        err.status= 400;
        return next(err);
      }

});

//GET route after registering

router.get('/profile', function(req, res, next){
  Account.findById(req.session.accountId)
  .exec(function (error,acount){
    if(error){
      return next(error);
    } else {
      if (account === null){
        var err = new Error('Not authorized! go back!');
        err.status = 400;
        return next(err);
      }else{
        return res.send('<h1>Name: </h1>' + account.username + '<h2>Mail: </h2>' + account.email + '<br><a type= button" href="/logout"')
      }
    }
    });
});


//get for logout

router.get('/logout', function(req, res next){
  if (req.session){
    //delete session object
    req.session.destory(function(err){
      if (err){
        return next(err);
      } else {
        return res.redirect('/')
      }
    });
  }
});

module.exports = router;
