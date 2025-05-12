import React, { useState } from 'react';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Tabs,
  Tab,
  Alert,
  InputAdornment,
  IconButton
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axios';

const illustrationUrl = 'https://img.icons8.com/fluency/96/000000/books.png';

const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = mode === 'login' ? 'signin' : 'signup';
      const response = await axios.post(`/auth/${endpoint}`, form);
      
      if (mode === 'login') {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userRole', response.data.role);
        navigate('/books');
      } else {
        setSuccess('Регистрация успешна! Теперь вы можете войти.');
        setMode('login');
        setForm({ email: '', password: '' });
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Ошибка авторизации или регистрации');
    }
  };

  return (
    <Box sx={{
      position: 'relative',
      minHeight: '100vh',
      overflow: 'auto',
      fontFamily: 'Poppins, sans-serif',
      zIndex: 1,
    }}>
      {/* Параллакс фон с размытием */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          zIndex: 0,
          background: 'linear-gradient(135deg, #667eea, #764ba2)',
          backgroundAttachment: 'fixed',
          filter: 'blur(6px) brightness(0.95)',
          transition: 'background 0.8s',
        }}
      />
      <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Paper elevation={8} sx={{ 
          p: 4, 
          borderRadius: 5,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          animation: 'fadeIn 1.2s',
          '@keyframes fadeIn': {
            from: { opacity: 0, transform: 'translateY(40px)' },
            to: { opacity: 1, transform: 'none' }
          }
        }}>
          <img src={illustrationUrl} alt="Библиотека" style={{ width: 72, marginBottom: 12 }} />
          <Typography 
            variant="h4" 
            align="center" 
            gutterBottom 
            color="primary"
            sx={{ fontWeight: 'bold', mb: 2 }}
          >
            Библиотека
          </Typography>

          <Tabs 
            value={mode} 
            onChange={(e, val) => setMode(val)} 
            centered 
            sx={{ mb: 2,
              width: '100%',
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1.1rem',
                letterSpacing: 0.5,
                color: '#764ba2',
                transition: 'all 0.3s',
                borderRadius: 2,
                minHeight: 44,
                px: 2,
              },
              '& .Mui-selected': {
                color: '#fff !important',
                background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                boxShadow: '0 2px 12px 0 rgba(102,126,234,0.12)',
              },
              '& .MuiTabs-indicator': {
                display: 'none',
              },
            }}
          >
            <Tab label="Вход" value="login" />
            <Tab label="Регистрация" value="register" />
          </Tabs>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
            <TextField
              label="Email"
              name="email"
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.email}
              onChange={handleChange}
              required
              sx={{ background: '#f7f9fa', borderRadius: 2 }}
            />
            <TextField
              label="Пароль"
              name="password"
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
              variant="outlined"
              value={form.password}
              onChange={handleChange}
              required
              sx={{ background: '#f7f9fa', borderRadius: 2 }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((show) => !show)}
                      edge="end"
                      aria-label="Показать пароль"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              color="primary"
              sx={{ 
                mt: 2,
                py: 1.5,
                fontSize: '1.1rem',
                borderRadius: 2,
                boxShadow: '0 4px 20px 0 rgba(33,150,243,0.15)',
                transition: 'background 0.3s',
                '&:hover': {
                  background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                }
              }}
            >
              {mode === 'login' ? 'Войти' : 'Зарегистрироваться'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default LoginPage; 