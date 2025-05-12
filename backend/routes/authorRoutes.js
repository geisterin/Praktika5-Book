const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authorController');
const authorValidation = require('../middlewares/authorValidation');
const validate = require('../middlewares/validate');
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin'); // 👑

/**
 * @swagger
 * tags:
 *   name: Authors
 *   description: API для управления авторами

 * /authors:
 *   get:
 *     summary: Получить список авторов
 *     tags: [Authors]
 *     responses:
 *       200:
 *         description: Успешно получен список авторов
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Author'

 *   post:
 *     summary: Создать нового автора
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorInput'
 *     responses:
 *       201:
 *         description: Автор создан
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */


/* 🔓 Открытые */
router.get('/', authorController.getAll);
router.get('/:id', authorController.getById);

/* 🔒 Только для admin */
router.post('/', authMiddleware, isAdmin, authorValidation, validate, authorController.create);

/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Обновить данные автора
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID автора
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthorInput'
 *     responses:
 *       200:
 *         description: Автор обновлён
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Author'
 */

router.put('/:id', authMiddleware, isAdmin, authorValidation, validate, authorController.update);
router.delete('/:id', authMiddleware, isAdmin, authorController.delete);

module.exports = router;
