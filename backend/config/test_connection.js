const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT,
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('✅ Подключение к БД успешно!');
  })
  .catch((err) => {
    console.error('❌ Ошибка подключения к БД:', err);
  });
