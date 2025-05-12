const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const categoryValidation = require('../middlewares/categoryValidation');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin'); // 👑

// 🔓 Открытые маршруты
/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: API для работы с категориями

 * /categories:
 *   get:
 *     summary: Получить список категорий
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Успешно
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'

 *   post:
 *     summary: Добавить новую категорию
 *     tags: [Categories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CategoryInput'
 *     responses:
 *       201:
 *         description: Категория создана
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 */

router.get('/search', categoryController.search); // 👈 ДО :id
router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);

/* 🔒 Только для admin */
router.post('/', authMiddleware, isAdmin, categoryValidation, validate, categoryController.create);
router.put('/:id', authMiddleware, isAdmin, categoryValidation, validate, categoryController.update);
router.delete('/:id', authMiddleware, isAdmin, categoryController.delete);

module.exports = router;
