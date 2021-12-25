const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidatonError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');
const { userErrorMessages } = require('../utils/constants');

module.exports.createUser = ((req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, name, password: hash,
      })
        .then((user) => res.send({
          data: {
            email: user.email,
            name: user.name,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new ValidatonError(err.message);
          }
          if (!password) {
            throw new ValidatonError(userErrorMessages.enterPassword);
          }
          if (err.name === 'MongoServerError' && err.code === 11000) {
            throw new ConflictError(userErrorMessages.conflict);
          }
        })
        .catch(next);
    })
    .catch(next);
});

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(userErrorMessages.unauthorized);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(userErrorMessages.unauthorized);
          }
          const token = jwt.sign(
            { _id: user._id },
            NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
            { expiresIn: '7d' },
          );
          res.send(token);
        })
        .catch(next);
    })
    .catch(next);
};

module.exports.getUserInfo = ((req, res, next) => {
  User.find(req.user)
    .then((user) => res.send(user))
    .catch(next);
});

module.exports.updateUser = ((req, res, next) => {
  const { email, name } = req.body;

  User.findById(req.user)
    .then((user) => {
      if (!email || !name) {
        throw new ValidatonError(userErrorMessages.required);
      }
      if (user.email === email) {
        throw new ValidatonError(userErrorMessages.enterNewEmail);
      }
      if (user.name === name) {
        throw new ValidatonError(userErrorMessages.enterNewName);
      }
      User.findByIdAndUpdate(user, { email, name }, { new: true })
        .then((updateUser) => {
          if (!updateUser) {
            throw new NotFoundError(userErrorMessages.notFoundId);
          }
          res.send(updateUser);
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new ValidatonError(userErrorMessages.incorrectData);
          }
          if (err.name === 'CastError') {
            throw new ValidatonError(userErrorMessages.incorrectId);
          }
          if (err.name === 'MongoServerError' && err.code === 11000) {
            throw new ConflictError(userErrorMessages.conflict);
          }
        })
        .catch(next);
    })
    .catch(next);
});
