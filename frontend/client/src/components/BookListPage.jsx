import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  TextField,
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import AdminGreeting from './AdminGreeting';
import UserGreeting from './UserGreeting';

const BookListPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const theme = useTheme();
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 9;

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchBooks();
  }, [searchQuery, selectedCategory, page]);

  const fetchBooks = async () => {
    try {
      const params = {
        title: searchQuery,
        category: selectedCategory,
        page,
        limit
      };
      // Удаляем пустые параметры
      Object.keys(params).forEach(key => {
        if (!params[key]) delete params[key];
      });
      const response = await axios.get('/books/search', {
        params,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBooks(response.data.books || []);
      setTotal(response.data.total || 0);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error('Ошибка при загрузке книг:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/categories');
      setCategories(response.data || []);
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
    }
  };

  const handleSearch = (event) => {
    setPage(1);
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setPage(1);
    setSelectedCategory(event.target.value);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setBooks((prev) => prev.filter((book) => book.id !== id));
    } catch (error) {
      console.error('Ошибка при удалении книги:', error);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {userRole === 'admin' && (
        <AdminGreeting user={{ role: userRole }} />
      )}
      {userRole === 'user' && (
        <UserGreeting />
      )}
      <Box sx={{ my: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            textAlign: 'center',
            mb: 4
          }}
        >
          Библиотека
        </Typography>
        
        {userRole === 'Admin' && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/books/new')}
            sx={{ 
              mb: 3,
              width: '100%',
              borderRadius: 2,
              py: 1.5
            }}
          >
            Добавить новую книгу
          </Button>
        )}

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Поиск книг"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearch}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2
                }
              }}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <FormControl fullWidth>
              <InputLabel>Жанр</InputLabel>
              <Select
                value={selectedCategory}
                onChange={handleCategoryChange}
                label="Жанр"
                sx={{ 
                  borderRadius: 2
                }}
              >
                <MenuItem value="">Все жанры</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.name}>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {books.length === 0 ? (
          <Typography variant="h6" align="center" sx={{ mt: 4 }}>
            Книги не найдены
          </Typography>
        ) : (
          <Grid container spacing={3}>
            {books.map((book) => (
              <Grid item xs={12} sm={6} md={4} key={book.id}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    borderRadius: 4,
                    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 6px 12px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    image={book.image ? `http://localhost:3000${book.image}` : '/images/books/favicon.png'}
                    alt={book.title}
                    sx={{
                      width: 180,
                      height: 270,
                      objectFit: 'cover',
                      borderRadius: '10px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                      border: '3px solid #fff',
                      background: '#f5f5f5',
                      margin: '24px auto 0 auto',
                      display: 'block'
                    }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        color: theme.palette.primary.main
                      }}
                    >
                      {book.title}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      <strong>Автор:</strong> {book.authors?.map(a => `${a.first_name} ${a.last_name}`).join(', ') || '—'}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      <strong>Жанр:</strong> {book.category?.name || '—'}
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                      <strong>Год:</strong> {book.publication_year}
                    </Typography>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => navigate(`/books/${book.id}`)}
                      sx={{ 
                        mt: 2,
                        width: '100%',
                        borderRadius: 2,
                        py: 1
                      }}
                    >
                      ПОДРОБНЕЕ
                    </Button>
                    {userRole === 'admin' && (
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => handleDelete(book.id)}
                        sx={{ mt: 1, width: '100%', borderRadius: 2 }}
                      >
                        Удалить
                      </Button>
                    )}
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}

        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            sx={{ mr: 2 }}
          >
            Назад
          </Button>
          <Typography sx={{ pt: 1 }}>{page} / {totalPages}</Typography>
          <Button
            variant="outlined"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            sx={{ ml: 2 }}
          >
            Вперёд
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BookListPage;
