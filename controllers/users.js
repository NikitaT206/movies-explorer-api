/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ValidatonError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const ConflictError = require('../errors/ConflictError');

module.exports.createUser = ((req, res, next) => {
  const {
    email, password, name,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        email, name, password: hash,
      })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new ValidatonError(err.message);
          }
          if (!password) {
            throw new ValidatonError('Введите пароль');
          }
          if (err.name === 'MongoServerError' && err.code === 11000) {
            throw new ConflictError('Пользователь с указанным email уже существует');
          }
        })
        .then((user) => res.send({
          data: {
            email: user.email,
            name: user.name,
          },
        }))
        .catch(next);
    });
});

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  const { NODE_ENV, JWT_SECRET } = process.env;

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправльные почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправльные почта или пароль');
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

  User.findByIdAndUpdate(req.user, { email, name }, { new: true })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidatonError('Переданы некорректные данные');
      }
      if (err.name === 'CastError') {
        throw new ValidatonError('Проверьте правильность ввода id');
      }
    })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователя с таким id не существует');
      }
      res.send(user);
    })
    .catch(next);
});
