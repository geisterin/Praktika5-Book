import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';


const NewBookPage = () => {
  const [book, setBook] = useState({
    title: '',
    description: '',
    publication_year: '',
    category_id: '',
    author_ids: []
  });
  const [error, setError] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const [newCategory, setNewCategory] = useState('');
  const [categoryError, setCategoryError] = useState('');
  const [authors, setAuthors] = useState([]);
  const [openAuthorDialog, setOpenAuthorDialog] = useState(false);
  const [newAuthor, setNewAuthor] = useState({ first_name: '', last_name: '' });
  const [authorError, setAuthorError] = useState('');

  const handleChange = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleCategoryChange = (e) => {
    setBook({
      ...book,
      category_id: e.target.value
    });
  };

  const handleAuthorChange = (e) => {
    setBook({
      ...book,
      author_ids: e.target.value
    });
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      setCategoryError('Название обязательно');
      return;
    }
    try {
      const res = await axios.post('/categories', { name: newCategory });
      setCategories((prev) => [...prev, res.data]);
      setBook((prev) => ({ ...prev, category_id: res.data.id }));
      setOpenCategoryDialog(false);
      setNewCategory('');
      setCategoryError('');
    } catch (err) {
      if (err.response?.status === 409) {
        setCategoryError('Такой жанр уже существует');
      } else {
        setCategoryError('Ошибка при добавлении жанра');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        const uploadRes = await axios.post('/api/upload/image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        imageUrl = uploadRes.data.image;
        console.log('Загружено изображение, путь:', imageUrl);
      }
      const payload = {
        title: book.title,
        description: book.description,
        publication_year: book.publication_year,
        category_id: book.category_id,
        author_ids: book.author_ids,
        image: imageUrl
      };
      console.log('Создаём книгу с данными:', payload);
      await axios.post('/books', payload, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      navigate('/books');
    } catch (error) {
      setError('Ошибка при добавлении книги');
      console.error('Ошибка при добавлении книги:', error);
    }
  };

  useEffect(() => {
    axios.get('/categories').then(res => setCategories(res.data));
    axios.get('/authors').then(res => setAuthors(res.data));
  }, []);

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Добавить новую книгу
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Название"
            name="title"
            value={book.title}
            onChange={handleChange}
            required
            margin="normal"
          />

          <TextField
            fullWidth
            label="Описание"
            name="description"
            value={book.description}
            onChange={handleChange}
            required
            margin="normal"
            multiline
            minRows={2}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Жанр</InputLabel>
            <Select
              value={book.category_id || ''}
              onChange={handleCategoryChange}
              label="Жанр"
              name="category_id"
              required
            >
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="text"
            onClick={() => setOpenCategoryDialog(true)}
            sx={{ mb: 2 }}
          >
            + Добавить жанр
          </Button>

          <FormControl fullWidth margin="normal">
            <InputLabel>Авторы</InputLabel>
            <Select
              multiple
              value={book.author_ids}
              onChange={handleAuthorChange}
              label="Авторы"
              name="author_ids"
              required
              renderValue={(selected) =>
                authors
                  .filter((a) => selected.includes(a.id))
                  .map((a) => `${a.first_name} ${a.last_name}`)
                  .join(', ')
              }
            >
              {authors.map((author) => (
                <MenuItem key={author.id} value={author.id}>
                  {author.first_name} {author.last_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="text"
            onClick={() => setOpenAuthorDialog(true)}
            sx={{ mb: 2 }}
          >
            + ДОБАВИТЬ АВТОРА
          </Button>

          <TextField
            fullWidth
            label="Год издания"
            name="publication_year"
            type="number"
            value={book.publication_year}
            onChange={handleChange}
            required
            margin="normal"
          />

          <Button
            variant="outlined"
            component="label"
            sx={{ mt: 2 }}
          >
            Загрузить изображение
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={handleImageChange}
            />
          </Button>
          {imageFile && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Файл: {imageFile.name}
            </Typography>
          )}

          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}

          <Box sx={{ mt: 3 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mr: 2 }}
            >
              Добавить книгу
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/books')}
            >
              Отмена
            </Button>
          </Box>
        </form>
      </Paper>
      <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)}>
        <DialogTitle>Добавить жанр</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Название жанра"
            fullWidth
            value={newCategory}
            onChange={e => setNewCategory(e.target.value)}
            error={!!categoryError}
            helperText={categoryError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Отмена</Button>
          <Button onClick={handleAddCategory} variant="contained">Добавить</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openAuthorDialog} onClose={() => setOpenAuthorDialog(false)}>
        <DialogTitle>Добавить автора</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Имя"
            fullWidth
            value={newAuthor.first_name}
            onChange={e => setNewAuthor({ ...newAuthor, first_name: e.target.value })}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            label="Фамилия"
            fullWidth
            value={newAuthor.last_name}
            onChange={e => setNewAuthor({ ...newAuthor, last_name: e.target.value })}
            sx={{ mb: 2 }}
          />
          {authorError && (
            <Typography color="error" sx={{ mt: 1 }}>
              {authorError}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAuthorDialog(false)}>Отмена</Button>
          <Button onClick={async () => {
            if (!newAuthor.first_name.trim() || !newAuthor.last_name.trim()) {
              setAuthorError('Имя и фамилия обязательны');
              return;
            }
            try {
              const res = await axios.post('/authors', newAuthor);
              setAuthors((prev) => [...prev, res.data]);
              setBook((prev) => ({
                ...prev,
                author_ids: [...prev.author_ids, res.data.id]
              }));
              setOpenAuthorDialog(false);
              setNewAuthor({ first_name: '', last_name: '' });
              setAuthorError('');
            } catch (err) {
              setAuthorError('Ошибка при добавлении автора');
            }
          }} variant="contained">Добавить</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default NewBookPage; 