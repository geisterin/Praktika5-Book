# 📚 Praktika5 — Библиотека (Frontend + Backend)

## 📦 Описание проекта

Веб-приложение для онлайн-библиотеки, состоящее из двух частей:
- ✅ **Backend**: REST API для работы с книгами, комментариями, ролями пользователей.
- ✅ **Frontend**: Веб-интерфейс для пользователей и администраторов.

Реализованы:
- Загрузка/скачивание книг (epub/fb2)
- Просмотр каталога книг, комментариев
- Роли пользователей (администратор, пользователь)
- Защищённые маршруты и авторизация через JWT

---

## 📁 Структура репозитория

praktika5/
├── backend/ # Серверная часть (Node.js, Express, PostgreSQL)
├── frontend/ # Клиентская часть (React, Vite, MUI)
├── README.md # Главный README (этот файл)
└── .gitignore # Игнорируемые файлы для всего проекта


---

## 🚀 Быстрый старт

### Backend (API)
```bash
cd backend
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run dev

➡️ API доступен на http://localhost:3000

cd frontend/client
npm install
npm run dev


➡️ Веб-интерфейс доступен на http://localhost:3005

🧑‍💻 Тестовые данные для входа
Администратор:

Логин: admin@example.com

Пароль: 123456

🔗 Подробнее о проекте
📦 ./backend/README.md

🎨 ./frontend/client/README.md

📝 Основные технологии
Backend:
Node.js + Express

Sequelize + PostgreSQL

JWT для авторизации

Multer для загрузки файлов

Swagger для API-документации

Frontend:
React 18 + Vite

Material-UI (MUI)

React Router v6

Axios для API-запросов

🧩 Особенности проекта
Защищённые маршруты по JWT-токену

Разделение ролей: админ и пользователь

Хранение файлов книг в public/books/

Удобный интерфейс для загрузки/скачивания книг

Адаптивный дизайн на MUI

✅ TODO
Доработать фронтенд-кнопку "Скачать книгу" (авторизация, загрузка статуса)

Добавить валидацию форматов файлов на фронте

Реализовать обработку ошибок на клиенте