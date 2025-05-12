# 📚 Praktika5 — Backend API для управления библиотекой книг

## Описание

RESTful API для управления каталогом книг, авторами, категориями и комментариями с поддержкой ролей (админ/пользователь), загрузкой и скачиванием файлов книг (epub/fb2).

---

## 🚀 Быстрый старт

### 1. Установка зависимостей
```bash
npm install
```

### 2. Настройка переменных окружения
Создайте файл `.env` в корне проекта:
```
DB_NAME=db_Romanaova_01_05
DB_USERNAME=ziroma
DB_PASSWORD=t231803
DB_HOST=dev.vk.edu.ee
DB_PORT=5432
DB_DIALECT=postgres


JWT_SECRET=мойсекретныйключ123

PORT=3000
```

### 3. Миграции и сидеры
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 4. Запуск сервера
```bash
npm run dev
```

---

## 📂 Структура проекта
```
├── app.js
├── controllers/
├── middlewares/
├── migrations/
├── models/
├── public/
│   └── books/         # Загруженные файлы книг (epub/fb2)
├── routes/
├── seeders/
├── scripts/
├── .env
└── README.md
```

---

## 🔐 Авторизация и роли
- JWT-токен обязателен для всех защищённых маршрутов.
- Роли: `admin` (полный доступ), `user` (только просмотр и комментарии).
- Токен передаётся в заголовке:
  ```
  Authorization: Bearer <ваш_токен>
  ```

---

## 📑 Основные эндпоинты

### Аутентификация
- `POST /auth/signup` — регистрация
- `POST /auth/signin` — вход

### Книги
- `GET /books` — список книг
- `GET /books/:id` — информация о книге
- `POST /books` — добавить книгу (**admin**)
- `PUT /books/:id` — обновить книгу (**admin**)
- `DELETE /books/:id` — удалить книгу (**admin**)
- `POST /books/:id/upload` — загрузить файл книги (epub/fb2, **admin**)
- `GET /books/:id/download` — скачать файл книги (**user**)

### Авторы и категории
- `GET /authors`, `GET /categories` — списки
- `POST /authors`, `POST /categories` — добавить (**admin**)

### Комментарии
- `POST /books/:id/comments` — добавить комментарий
- `GET /books/:id/comments` — получить комментарии

---

## 📥 Загрузка и скачивание книг
- **Загрузка:**
  - Файл отправляется через `POST /books/:id/upload` (поле `bookFile` в FormData).
  - Файл сохраняется в папку `public/books/`.
  - В базе у книги обновляется поле `file_url`.
- **Скачивание:**
  - `GET /books/:id/download` — отдаёт файл пользователю (если он есть).

> ⚠️ **Внимание:** сейчас книга успешно загружается в папку `public/books`, но скачивание пользователю реализовано только на уровне backend-роута. На фронте требуется доработка для полноценной работы кнопки "Скачать" и отображения статуса файла.

---

## 🛠 Примеры запросов

### Загрузка файла книги (admin)
```bash
curl -X POST http://localhost:3000/books/1/upload \
  -H "Authorization: Bearer <ваш_токен>" \
  -F "bookFile=@/path/to/book.epub"
```

### Скачивание файла книги (user)
```bash
curl -X GET http://localhost:3000/books/1/download \
  -H "Authorization: Bearer <ваш_токен>" --output book.epub
```

---

## 📝 Swagger-документация

Swagger UI доступен по адресу:
- http://localhost:3000/api-docs

---

## 🧩 Особенности и TODO
- Все файлы книг хранятся в `public/books/`.
- В базе у книги хранится путь к файлу (`file_url`).
- Для загрузки и скачивания требуется авторизация.
- **TODO:** доработать фронтенд для полноценного скачивания книг пользователем.
- **TODO:** добавить обработку ошибок и валидацию форматов файлов на фронте.

---

## 🤝 Контакты и поддержка
Если возникли вопросы — пиши в issues или напрямую разработчику!

