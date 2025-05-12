const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const bookValidation = require('../middlewares/bookValidation'); // ✅ Валидация полей
const validate = require('../middlewares/validate');             // ✅ Обработка ошибок
const authMiddleware = require('../middlewares/authMiddleware'); // 🔐 JWT проверка
const isAdmin = require('../middlewares/isAdmin');               // 👑 Роль администратора
const { uploadBookFile } = require('../controllers/bookController');
const multer = require('multer');
const upload = multer({ dest: 'public/books/' });

/**
 * @swagger
 * /books/search:
 *   get:
 *     summary: Поиск книг по названию, автору или категории
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         description: Название книги
 *       - in: query
 *         name: author
 *         schema:
 *           type: string
 *         description: Имя автора
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Название категории
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Количество книг на странице
 *     responses:
 *       200:
 *         description: Успешный ответ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 total:
 *                   type: integer
 *                   description: Общее количество книг
 *                 currentPage:
 *                   type: integer
 *                   description: Текущая страница
 *                 totalPages:
 *                   type: integer
 *                   description: Общее количество страниц
 */
// 🔓 Открытые маршруты — доступны всем
router.get('/search', bookController.search);
/**
 * @swagger
 * /books:
 *   get:
 *     summary: Получить список всех книг
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Номер страницы
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Количество книг на странице
 *     responses:
 *       200:
 *         description: Список книг успешно получен
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 books:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Book'
 *                 total:
 *                   type: integer
 *                   description: Общее количество книг
 *                 currentPage:
 *                   type: integer
 *                   description: Текущая страница
 *                 totalPages:
 *                   type: integer
 *                   description: Общее количество страниц
 */

router.get('/', bookController.getAll);
router.get('/:id', bookController.getById);   // 👈 ДОЛЖЕН ИДТИ ПОСЛЕ

// 🔒 Защищённые маршруты — только для админа

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Добавить новую книгу
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/BookInput'
 *     responses:
 *       201:
 *         description: Книга добавлена
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Book'
 */

router.post('/', authMiddleware, isAdmin, bookValidation, validate, bookController.create);
router.put('/:id', authMiddleware, isAdmin, bookValidation, validate, bookController.update);
router.delete('/:id', authMiddleware, isAdmin, bookController.delete);

router.post('/:id/upload',
  authMiddleware,
  isAdmin,
  upload.single('bookFile'),
  uploadBookFile
);

module.exports = router;
