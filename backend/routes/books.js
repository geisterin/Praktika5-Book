const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// ... existing routes ...

// Загрузка файла книги (только для админа)
router.post('/:id/upload', 
  authMiddleware,
  roleMiddleware(['admin']),
  bookController.uploadBookFile
);

// Скачивание файла книги (для авторизованных пользователей)
router.get('/:id/download',
  authMiddleware,
  bookController.downloadBookFile
);

module.exports = router; 