import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const userRole = localStorage.getItem('userRole');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    navigate('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Библиотека
        </Typography>
        <Box>
          <Button color="inherit" onClick={() => navigate('/books')}>
            Книги
          </Button>
          {userRole === 'admin' && (
            <Button color="inherit" onClick={() => navigate('/books/new')}>
              Добавить книгу
            </Button>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar; 