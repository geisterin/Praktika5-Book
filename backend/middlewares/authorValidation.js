// middlewares/authorValidation.js
const { body } = require('express-validator');

const authorValidation = [
  body('first_name')
    .notEmpty().withMessage('Имя автора обязательно')
    .isLength({ min: 2 }).withMessage('Имя должно быть не короче 2 символов'),

  body('last_name')
    .notEmpty().withMessage('Фамилия автора обязательна')
    .isLength({ min: 2 }).withMessage('Фамилия должна быть не короче 2 символов'),
];

module.exports = authorValidation;
