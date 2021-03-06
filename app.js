require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');
const { limiter } = require('./middlewares/rateLimiter');
const { serverErrorMessages } = require('./utils/constants');

const { PORT = 3000 } = process.env;
const { MONGODB_URI = 'mongodb://localhost:27017/moviesdb' } = process.env;

const app = express();

app.use(requestLogger);

app.use(limiter);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.header('Access-Control-Allow-Credentials', true);
    return res.end();
  }
  return next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});

app.use(require('./routes/sign'));

app.use(auth);

app.use(require('./routes/users'));
app.use(require('./routes/movies'));

app.use(() => {
  throw new NotFoundError(serverErrorMessages.notFound);
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res.status(statusCode).send({
    message: statusCode === 500
      ? serverErrorMessages.serverError
      : message,
  });

  return next();
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
});
