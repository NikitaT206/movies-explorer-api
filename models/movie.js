/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  director: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  duration: {
    type: Number,
    required: [true, 'Обязательное поле'],
  },
  year: {
    type: Number,
    required: [true, 'Обязательное поле'],
  },
  description: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  image: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/.test(v);
      },
      message: 'Введен некорректный URL',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/.test(v);
      },
      message: 'Введен некорректный URL',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Обязательное поле'],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/.test(v);
      },
      message: 'Введен некорректный URL',
    },
  },
  owner: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  movieId: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  nameRU: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
  nameEN: {
    type: String,
    required: [true, 'Обязательное поле'],
  },
});

module.exports = mongoose.model('movie', movieSchema);
