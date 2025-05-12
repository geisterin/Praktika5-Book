const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Получение комментариев книги
router.get('/books/:id/comments', commentController.getBookComments);

// Создание комментария (только для авторизованных пользователей с ролью user или admin)
router.post('/books/:id/comments', 
  authMiddleware, 
  roleMiddleware(['user', 'admin']), 
  commentController.createComment
);

module.exports = router; 