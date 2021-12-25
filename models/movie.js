/* eslint-disable no-useless-escape */
const mongoose = require('mongoose');
const { validationMessages } = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, validationMessages.requiredField],
  },
  director: {
    type: String,
    required: [true, validationMessages.requiredField],
  },
  duration: {
    type: Number,
    required: [true, validationMessages.requiredField],
  },
  year: {
    type: Number,
    required: [true, validationMessages.requiredField],
  },
  description: {
    type: String,
    required: [true, validationMessages.requiredField],
  },
  image: {
    type: String,
    required: [true, validationMessages.requiredField],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/.test(v);
      },
      message: validationMessages.incorrectURL,
    },
  },
  trailer: {
    type: String,
    required: [true, validationMessages.requiredField],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/.test(v);
      },
      message: validationMessages.incorrectURL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, validationMessages.requiredField],
    validate: {
      validator(v) {
        return /^(https?:\/\/)(www)?([\da-z\.-]+)\.([a-z]{2,3})([\/\w\W \.-]*)*\/?#?$/.test(v);
      },
      message: validationMessages.incorrectURL,
    },
  },
  owner: {
    type: String,
    required: [true, validationMessages.requiredField],
  },
  movieId: {
    type: String,
    required: [true, validationMessages.requiredField],
  },
  nameRU: {
    type: String,
    required: [true, validationMessages.requiredField],
  },
  nameEN: {
    type: String,
    required: [true, validationMessages.requiredField],
  },
});

module.exports = mongoose.model('movie', movieSchema);
