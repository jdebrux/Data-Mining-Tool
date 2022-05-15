var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var SQLStore = require('express-mysql-session')(session);
var conn = require('./dbcredentials/dbconfig');

const fs = require('fs');
const https = require('https');


var faqRouter = require('./routes/faq');
var usersArchiveRouter = require('./routes/users-archive');
var loginRouter = require('./routes/login');
var hardwareRouter = require('./routes/hardware');
var softwareRouter = require('./routes/software');
var currentProblemsRouter = require('./routes/current-problems');
var manageUsersRouter = require('./routes/manage-users');
var analyticsRouter = require('./routes/analytics');
var openTicketsRouter = require('./routes/open-tickets')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// const httpsOptions = {
//   cert: fs.readFileSync('server.cert'),
//   key: fs.readFileSync('server.key')
// }

// https.createServer(httpsOptions, app)
//   .listen(5028, function(){
//     console.log('Working on HTTPS.');
//   });



// Session setup
const sessionStore = new SQLStore({}, conn);

app.use(session({
  secret: 'cookieSecret',
  store: sessionStore,
  expires : null,
  cookie : {
    // Will log the user out after 5 minutes of inactivity.
    maxAge : 60000 * 5
  }
  })
);

app.use('/faq', faqRouter);
app.use('/users-archive', usersArchiveRouter);
app.use('/login', loginRouter);
app.use('/hardware', hardwareRouter);
app.use('/software', softwareRouter);
app.use('/current-problems', currentProblemsRouter);
app.use('/manage-users', manageUsersRouter);
app.use('/analytics', analyticsRouter);
app.use('/open-tickets', openTicketsRouter);

// app.enable('trust proxy')
// app.use((req, res, next) => {
//   req.secure ? next() : res.redirect('https://' + req.headers.host + req.url)
// })


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/session/destroy', (req, res)=>{
  console.log('here');
  req.session.destroy();
  res.status(200).send('ok');
});

module.exports = app;

app.listen(5028, function(){

  console.log("Sever started port 5028 on Sci-Project.");
});

console.log("Startup complete");
