const Validator = require('validator');

const isEmpty = require('./is-empty');

module.exports = function validateProfileInput(data) {
  const errors = {};

  data.location = !isEmpty(data.location) ? data.location : '';
  data.phone = !isEmpty(data.phone) ? data.phone : '';

  if (Validator.isEmpty(data.location))
    errors.location = 'Location field is required';

  if (Validator.isEmpty(data.phone)) errors.phone = 'Phone field is required';

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook))
      errors.facebook = 'Facebook field must be a valid url';
  }

  if (!isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram))
      errors.instagram = 'Instagram field must be a valid url';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
