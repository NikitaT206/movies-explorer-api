const mongoose = require('mongoose');
const { validationMessages } = require('../utils/constants');
const { urlValidationSchema } = require('../utils/validation');

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
      validator: urlValidationSchema,
      message: validationMessages.incorrectURL,
    },
  },
  trailer: {
    type: String,
    required: [true, validationMessages.requiredField],
    validate: {
      validator: urlValidationSchema,
      message: validationMessages.incorrectURL,
    },
  },
  thumbnail: {
    type: String,
    required: [true, validationMessages.requiredField],
    validate: {
      validator: urlValidationSchema,
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
