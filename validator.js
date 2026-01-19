const { body, validationResult } = require('express-validator');

const employeeValidationRules = () => {
  return [
    body('firstName').isString().notEmpty().withMessage('First name is required'),
    body('lastName').isString().notEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Must be a valid email'),
    body('phone').isMobilePhone().withMessage('Must be a valid phone number'),
    body('jobTitle').isString().notEmpty().withMessage('Job title is required'),
    body('salary').isNumeric().withMessage('Salary must be a number'),
    body('hireDate').isISO8601().toDate().withMessage('Hire date must be a valid date')
  ]
}

const trainingValidationRules = () => {
  return [
    body('title').isString().notEmpty().withMessage('Training title is required'),
    body('description').isString().notEmpty().withMessage('Training description is required'),
    body('duration').isNumeric().withMessage('Duration must be a number')
  ]
}

const validate = (req, res, next) => {

  const errors = validationResult(req);

  if (errors.isEmpty()) {
    return next();
  }

  const extractedErrors = [];

  errors.array().map(err => extractedErrors.push({ [err.path]: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
}

module.exports = {
  employeeValidationRules,
  trainingValidationRules,
  validate
}