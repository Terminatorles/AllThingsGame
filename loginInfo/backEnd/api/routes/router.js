


if (req.body.email && req.body.username && req.body.password && req.body.passwordconfirmation){

  var userData ={
      email: req.body.email,
      username:req.body.username,
      password:req.body.password,
      passwordConfirmation:req.body.passwordConfirmation,

    }
    //using the Schema one will insert data into the database
    account.create(userData, function(err, account){
      if(err){
        return next(err)
        }  else {
            return res.redirect('/profile');
          }
        });
  }
