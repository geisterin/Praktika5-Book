const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const uploadMiddleware = require('../middlewares/uploadMiddleware');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');

// Загрузка изображения (только для админов)
router.post('/image', 
  authMiddleware, 
  isAdmin, 
  uploadMiddleware.single('image'), 
  uploadController.uploadImage
);

module.exports = router; 