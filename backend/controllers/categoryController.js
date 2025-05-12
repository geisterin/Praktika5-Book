const { Op } = require('sequelize');
const { Category } = require('../models');

module.exports = {
  async getAll(req, res) {
    const categories = await Category.findAll({
      attributes: ['id', 'name']
    });
    res.json(categories);
  },

  async getById(req, res) {
    const category = await Category.findByPk(req.params.id);
    if (!category) return res.status(404).json({ error: 'Категория не найдена' });
    res.json(category);
  },

  async create(req, res) {
    try {
      const { name } = req.body;
      if (!name) return res.status(400).json({ error: 'Название обязательно' });

      const exists = await Category.findOne({ where: { name } });
      if (exists) return res.status(409).json({ error: 'Такой жанр уже существует' });

      const category = await Category.create({ name });
      res.status(201).json({ id: category.id, name: category.name });
    } catch (err) {
      res.status(400).json({ error: 'Ошибка при создании категории' });
    }
  },

  async update(req, res) {
    const [updated] = await Category.update(req.body, {
      where: { id: req.params.id }
    });
    if (!updated) return res.status(404).json({ error: 'Категория не найдена' });
    res.json({ message: 'Категория обновлена' });
  },

  async delete(req, res) {
    const deleted = await Category.destroy({
      where: { id: req.params.id }
    });
    if (!deleted) return res.status(404).json({ error: 'Категория не найдена' });
    res.json({ message: 'Категория удалена' });
  },
  async search(req, res) {
    try {
      const { name } = req.query;

      const categories = await Category.findAll({
        where: name ? {
          name: {
            [Op.iLike]: `%${name}%`  // ищет по части строки без учёта регистра
          }
        } : undefined
      });

      res.json(categories);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при поиске категорий' });
    }
  }

};
