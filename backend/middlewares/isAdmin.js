module.exports = (req, res, next) => {
  console.log('isAdmin middleware, req.user:', req.user);
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Только администраторы могут выполнить это действие' });
  }
  next();
};
  