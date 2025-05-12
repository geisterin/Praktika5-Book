import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../api/axios';
import { CommentForm } from './CommentForm.jsx';
import { CommentList } from './CommentList.jsx';

const BookDetailPage = () => {
  const [book, setBook] = useState(null);
  const [comment, setComment] = useState('');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editBook, setEditBook] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');
  const [refreshComments, setRefreshComments] = useState(false);
  const [file, setFile] = useState(null);

  useEffect(() => {
    fetchBook();
  }, [id]);

  const fetchBook = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/books/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setBook(response.data);
      setEditBook(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке книги:', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Вы уверены, что хотите удалить эту книгу?')) {
      try {
        await axios.delete(`http://localhost:3000/books/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        });
        navigate('/books');
      } catch (error) {
        console.error('Ошибка при удалении книги:', error);
      }
    }
  };

  const handleEdit = async () => {
    try {
      await axios.put(`http://localhost:3000/books/${id}`, editBook, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setOpenEditDialog(false);
      fetchBook();
    } catch (error) {
      console.error('Ошибка при редактировании книги:', error);
    }
  };

  const handleComment = async () => {
    try {
      await axios.post(`http://localhost:3000/books/${id}/comments`, 
        { text: comment },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      setComment('');
      setRefreshComments(prev => !prev);
      fetchBook();
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('bookFile', file);
    try {
      await axios.post(`http://localhost:3000/books/${id}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      alert('Файл успешно загружен');
      fetchBook();
    } catch (error) {
      console.error('Ошибка при загрузке файла:', error);
    }
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(`http://localhost:3000/books/${id}/download`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Ошибка при скачивании файла');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Получаем имя файла из заголовка Content-Disposition, если оно есть
      let filename = 'book';
      const disposition = response.headers.get('Content-Disposition');
      if (disposition && disposition.indexOf('filename=') !== -1) {
        filename = disposition
          .split('filename=')[1]
          .replace(/['"]/g, '')
          .trim();
      }

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      alert('Ошибка при скачивании файла');
      console.error(error);
    }
  };

  const getImageUrl = (imagePath) => {
    return imagePath ? `http://localhost:3000${imagePath}` : '/images/books/default.png';
  };

  if (!book) {
    return <Typography>Загрузка...</Typography>;
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 4, my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {book.title}
        </Typography>
        
        <Typography variant="h6" gutterBottom>
          Автор: {book.authors?.map(a => `${a.first_name} ${a.last_name}`).join(', ') || '—'}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Жанр: {book.category?.name || '—'}
        </Typography>
        <Typography variant="h6" gutterBottom>
          Год издания: {book.publication_year}
        </Typography>
        <Typography variant="body1" paragraph>
          {book.description}
        </Typography>
        {book.image && (
          <Box sx={{ mt: 2, mb: 2 }}>
            <img
              src={getImageUrl(book.image)}
              alt={book.title}
              style={{
                maxWidth: '180px',
                maxHeight: '270px',
                width: '100%',
                height: 'auto',
                display: 'block',
                margin: '0 auto'
              }}
            />
          </Box>
        )}
        <Button variant="contained" color="primary" onClick={() => navigate('/books')} sx={{ mr: 2 }}>
          Назад
        </Button>
        {userRole === 'admin' && (
          <>
            <Button variant="contained" color="secondary" onClick={() => setOpenEditDialog(true)} sx={{ mr: 2 }}>
              Редактировать
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Удалить
            </Button>
            <Box sx={{ mt: 2 }}>
              <input type="file" onChange={handleFileChange} />
              <Button variant="contained" color="primary" onClick={handleFileUpload} sx={{ ml: 2 }}>
                Загрузить файл
              </Button>
            </Box>
          </>
        )}
        {book.file_url && (
          <Button variant="contained" color="primary" onClick={handleDownload} sx={{ ml: 2 }}>
            Скачать
          </Button>
        )}
      </Paper>

      {/* Секция комментариев */}
      <div className="comments-section">
        <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>Комментарии</Typography>
        <CommentForm bookId={book.id} onCommentAdded={() => setRefreshComments(prev => !prev)} />
        <CommentList bookId={book.id} refresh={refreshComments} />
      </div>

      <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
        <DialogTitle>Редактировать книгу</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Название"
            value={editBook.title}
            onChange={(e) => setEditBook({ ...editBook, title: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Описание"
            value={editBook.description}
            onChange={(e) => setEditBook({ ...editBook, description: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Год издания"
            value={editBook.publication_year}
            onChange={(e) => setEditBook({ ...editBook, publication_year: e.target.value })}
            sx={{ mt: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditDialog(false)}>Отмена</Button>
          <Button onClick={handleEdit} variant="contained" color="primary">
            Сохранить
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default BookDetailPage; 