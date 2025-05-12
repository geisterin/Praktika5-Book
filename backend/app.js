const express = require('express');
const cors = require('cors');
require('dotenv').config();
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Настройка CORS
app.use(cors({
  origin: 'http://localhost:3005',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Настройка статических файлов
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use('/books', express.static(path.join(__dirname, 'public/books')));

// 👇 Swagger
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Book Catalog API',
      version: '1.0.0',
      description: 'RESTful API для управления книгами, авторами и категориями'
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Локальный сервер'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        Author: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            first_name: { type: 'string', example: 'Евгений' },
            last_name: { type: 'string', example: 'Замятин' }
          }
        },
        AuthorInput: {
          type: 'object',
          required: ['first_name', 'last_name'],
          properties: {
            first_name: {
              type: 'string',
              example: 'Евгений',
              description: 'Имя автора'
            },
            last_name: {
              type: 'string',
              example: 'Замятин',
              description: 'Фамилия автора'
            }
          }
        },
        Book: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 15 },
            title: { type: 'string', example: 'Мы' },
            publication_year: { type: 'integer', example: 1924 },
            category_id: { type: 'integer', example: 1 },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
            Authors: {
              type: 'array',
              items: { $ref: '#/components/schemas/Author' }
            },
            Category: {
              $ref: '#/components/schemas/Category'
            }
          }
        },
        BookInput: {
          type: 'object',
          required: ['title', 'publication_year', 'category_id', 'author_ids'],
          properties: {
            title: {
              type: 'string',
              example: 'Мы',
              description: 'Название книги'
            },
            publication_year: {
              type: 'integer',
              example: 1924,
              description: 'Год публикации'
            },
            category_id: {
              type: 'integer',
              example: 1,
              description: 'ID категории книги'
            },
            author_ids: {
              type: 'array',
              description: 'Массив ID авторов (можно нескольких)',
              items: {
                type: 'integer',
                example: 9
              }
            }
          }
        },
        Category: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Фантастика' }
          }
        },
        CategoryInput: {
          type: 'object',
          required: ['name'],
          properties: {
            name: { type: 'string', example: 'Фантастика' }
          }
        },
        SignupInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
              description: 'Email пользователя'
            },
            password: {
              type: 'string',
              example: 'supersecret',
              description: 'Пароль'
            }
          }
        },
        SigninInput: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'user@example.com',
              description: 'Email пользователя'
            },
            password: {
              type: 'string',
              example: 'supersecret',
              description: 'Пароль'
            }
          }
        },
        TokenResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              description: 'JWT-токен для авторизации'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 📚 Роуты
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const commentRoutes = require('./routes/comments');

app.use('/books', bookRoutes);
app.use('/authors', authorRoutes);
app.use('/categories', categoryRoutes);
app.use('/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api', commentRoutes);

// 🔍 Health-check
app.get('/', (req, res) => {
  res.send('Здесь начинается твоя история.\nМир книг уже выбрал тебя 📚\nДобро пожаловать в библиотеку, где каждая страница — это новое приключение,\nа каждый герой — отражение твоей души.');
});

// 🚀 Запуск
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Сервер запущен: http://localhost:${PORT}`));
