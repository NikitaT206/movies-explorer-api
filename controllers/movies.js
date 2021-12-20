const Movie = require('../models/movie');
const ValidatonError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = ((req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
});

module.exports.createMovie = ((req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
    owner: req.user._id,
  })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new ValidatonError(err.message);
      }
    })
    .then((movie) => res.send(movie))
    .catch(next);
});

module.exports.deleteMovie = ((req, res, next) => {
  Movie.findById(req.params.movieId)
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new ValidatonError('Проверьте правильность ввода id');
      }
    })
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError('Фильма с таким id не существует');
      }
      if (movie.owner.valueOf() !== req.user._id) {
        throw new ForbiddenError('Вы не можете удалять чужие фильмы');
      }
      Movie.findByIdAndRemove(req.params.movieId)
        .then((deleteMovie) => {
          res.send(deleteMovie);
        })
        .catch(next);
    })
    .catch(next);
});
