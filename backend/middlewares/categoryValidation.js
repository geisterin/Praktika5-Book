// middlewares/categoryValidation.js
const { body } = require('express-validator');

const categoryValidation = [
  body('name')
    .notEmpty().withMessage('Название категории обязательно')
    .isLength({ min: 3 }).withMessage('Минимум 3 символа'),
];

module.exports = categoryValidation;
