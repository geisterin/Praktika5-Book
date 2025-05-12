// validation/bookValidation.js
const { body } = require('express-validator');

const bookValidationRules = [
  body('title')
    .notEmpty().withMessage('Название книги обязательно')
    .isLength({ min: 2 }).withMessage('Название должно быть не короче 2 символов'),

  body('publicationYear')
    .optional()
    .isInt({ min: 0, max: new Date().getFullYear() }).withMessage('Год публикации должен быть числом'),

  body('categoryId')
    .optional()
    .isInt().withMessage('ID категории должен быть числом'),
];

module.exports = bookValidationRules;
