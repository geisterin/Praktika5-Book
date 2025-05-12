const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../models');

const JWT_SECRET = process.env.JWT_SECRET || 'supersecret';

module.exports = {
  async signup(req, res) {
    try {
      const { email, username, password, role_id } = req.body;

      const hash = await bcrypt.hash(password, 10);

      const user = await User.create({
        email,
        username,
        password: hash,
        role_id: role_id || 2 // 2 — обычный пользователь
      });

      res.status(201).json({ message: 'Пользователь зарегистрирован', user });
    } catch (err) {
      res.status(400).json({ error: 'Ошибка регистрации', details: err.message });
    }
  },

  async signin(req, res) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ 
        where: { email },
        include: [{ model: Role }]
      });
      
      if (!user) return res.status(401).json({ error: 'Неверный email или пароль' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(401).json({ error: 'Неверный email или пароль' });

      const token = jwt.sign({ id: user.id, role: user.Role ? user.Role.name : 'user' }, JWT_SECRET, { expiresIn: '8h' });

      res.json({ 
        message: 'Успешный вход', 
        token,
        role: user.Role ? user.Role.name : 'User'
      });
    } catch (err) {
      console.error('Signin error:', err);
      res.status(500).json({ error: 'Ошибка сервера при входе' });
    }
  }
};
