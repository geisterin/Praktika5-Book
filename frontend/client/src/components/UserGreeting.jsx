import React from 'react';
import { Box, Typography } from '@mui/material';

const UserGreeting = () => (
  <Box sx={{ background: '#f0f7ff', borderRadius: 2, p: 2, mb: 3 }}>
    <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
      Здесь начинается твоя история. Мир книг уже выбрал тебя 📚
    </Typography>
    <Typography variant="body1" sx={{ mt: 1 }}>
      Добро пожаловать в библиотеку, где каждая страница — это новое приключение, а каждый герой — отражение твоей души.
    </Typography>
  </Box>
);

export default UserGreeting; 