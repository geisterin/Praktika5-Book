module.exports = {
  async uploadImage(req, res) {
    try {
      console.log('Загрузка изображения. Полученный файл:', req.file);

      if (!req.file) {
        return res.status(400).json({ error: 'Файл не был загружен' });
      }

      const imageUrl = `/images/books/${req.file.filename}`;
      const response = { 
        message: 'Файл успешно загружен',
        image: imageUrl
      };

      console.log('Отправляем ответ:', response);
      res.json(response);
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
      res.status(500).json({ error: 'Ошибка при загрузке файла' });
    }
  }
}; 