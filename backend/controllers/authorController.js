const { Author } = require('../models');

module.exports = {
  async getAll(req, res) {
    try {
      const authors = await Author.findAll();
      res.json(authors);
    } catch (err) {
      console.error(err); // 👈 добавь для отладки
      res.status(500).json({ error: 'Ошибка при получении авторов' });
    }
  },

  async getById(req, res) {
    try {
      const author = await Author.findByPk(req.params.id);
      if (!author) return res.status(404).json({ error: 'Автор не найден' });
      res.json(author);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при получении автора' });
    }
  },

  async create(req, res) {
    try {
      const { first_name, last_name } = req.body;
      const author = await Author.create({ first_name, last_name });
      res.status(201).json(author);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Ошибка при создании автора' });
    }
  },

  async update(req, res) {
    try {
      const { first_name, last_name } = req.body;
      const [updated] = await Author.update({ first_name, last_name }, {
        where: { id: req.params.id }
      });
      if (!updated) return res.status(404).json({ error: 'Автор не найден' });
      res.json({ message: 'Автор обновлён' });
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Ошибка при обновлении автора' });
    }
  },

  async delete(req, res) {
    try {
      const deleted = await Author.destroy({
        where: { id: req.params.id }
      });
      if (!deleted) return res.status(404).json({ error: 'Автор не найден' });
      res.json({ message: 'Автор удалён' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Ошибка при удалении автора' });
    }
  }
};
