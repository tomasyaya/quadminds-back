const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const port = process.env.PORT || 4000;
const cors = require('cors');
require('dotenv').config();

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

mongoose.connect(process.env.MONGODB_URI, {
  keepAlive: true,
  useNewUrlParser: true,
  reconnectTries: Number.MAX_VALUE
}).then(() => {
  console.log(`Connected to database`);
}).catch((error) => {
  console.error(error);
})

const app = express();


app.use(cors({
  credentials: true,
  origin: [process.env.PUBLIC_DOMAIN]
}));


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);



//ERROR HANDLER

app.use((req, res, next) => {
  res.status(404).json({ code: 'not found' });
});

app.use((err, req, res, next) => {
  
  console.error('ERROR', req.method, req.path, err);
  if (!res.headersSent) {
    const statusError = err.status || '500' 
    res.status(statusError).json(err);
  }
});

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});

module.exports = app;
