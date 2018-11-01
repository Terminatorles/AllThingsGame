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
  resave: true,
  saveUninitialized: false.
  store: new MongoStore({
    mongooseConnection: db
  })
}));

// parse incoming requests
app. use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

//serve static files from template
app.use(express.static(_dirnam + '/tamplateLogReg'));

//include routes
var routes = require('./routes/router');
app.use('/', routes);


//catch 404 and forward to error handler
app.use(function(err, req, res, next){
  res.status(err, req, res, next);
  res.send(err, message);
});

//listen on part 6000
app.listen(6000, function(){
  console.log('Express app listening on port 6000');
});
