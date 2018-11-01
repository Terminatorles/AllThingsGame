let express = require('express');
let app =express();
let bodyParser =require('body-parser');
let mongoose =require('mongoose');
let session =require('exrpess-session');
let MongoStore=require('connect-mongo')(session);

//connect to MongoDB

mongoose = connect('mongodb//localhost/6000');
let db=mongoose.connection;

//handle mongo error;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
  return console.log("connection succesful");
});

//use sessions for tracking logins
app.use(session({
  secrect: 'work',
  resave
})
