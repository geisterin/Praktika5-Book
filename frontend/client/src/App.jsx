import React from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { Routes, Route, Navigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';

// Компоненты
import Navbar from './components/Navbar.jsx';
import LoginPage from './components/LoginPage.jsx';
import BookListPage from './components/BookListPage.jsx';
import BookDetailPage from './components/BookDetailPage.jsx';
import NewBookPage from './components/NewBookPage.jsx';
import PrivateRoute from './components/PrivateRoute.jsx';

// Создаем тему
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  console.log('✅ App компонент монтируется');

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/books"
            element={
              <PrivateRoute>
                <BookListPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/:id"
            element={
              <PrivateRoute>
                <BookDetailPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/books/new"
            element={
              <PrivateRoute adminOnly>
                <NewBookPage />
              </PrivateRoute>
            }
          />
          <Route path="/" element={<Navigate to="/books" replace />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
