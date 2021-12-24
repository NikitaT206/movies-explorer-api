const validator = require('validator');
const { validationMessages } = require('./constants');

module.exports.urlValidationJoi = (value, helpers) => {
  if (validator.isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true })) {
    return value;
  }
  return helpers.message(validationMessages.incorrectURL);
};

module.exports.urlValidationSchema = (value) => {
  if (validator.isURL(value, { protocols: ['http', 'https'], require_tld: true, require_protocol: true })) {
    return value;
  }
  return '';
};
