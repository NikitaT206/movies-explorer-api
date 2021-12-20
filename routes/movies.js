/* eslint-disable no-useless-escape */
const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/movies', getMovies);
router.post('/movies', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.number().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(/^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/),
    trailer: Joi.string().required().regex(/^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/),
    thumbnail: Joi.string().required().regex(/^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/),
    movieId: Joi.string().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), createMovie);
router.delete('/movies/:movieId', deleteMovie);

module.exports = router;
