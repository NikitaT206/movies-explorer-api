const mongoose = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');
const { validationMessages } = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, validationMessages.requiredField],
    unique: true,
    validate: [isEmail, validationMessages.incorrectEmail],
  },
  password: {
    type: String,
    required: [true, validationMessages.requiredField],
    select: false,
  },
  name: {
    type: String,
    required: [true, validationMessages.requiredField],
    minlength: 2,
    maxlength: 30,
  },
});

module.exports = mongoose.model('user', userSchema);
