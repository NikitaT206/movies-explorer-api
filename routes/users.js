/* eslint-disable no-unused-vars */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { updateUser, getUserInfo } = require('../controllers/users');

router.get('/users/me', getUserInfo);
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().email(),
  }),
}), updateUser);

module.exports = router;
