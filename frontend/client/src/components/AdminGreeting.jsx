import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';

const librarianLegends = [
  {
    name: "Мелвилл Дьюи",
    greeting: "Привет, Дьюи!",
    roleLabel: "Chief Dewey",
    info: "Отец современной библиотечной науки, создатель десятичной классификации."
  },
  {
    name: "Ранганатан",
    greeting: "Добро пожаловать, Ранганатан!",
    roleLabel: "S. R. Ranganathan",
    info: "Индийский реформатор, автор 5 законов библиотечного дела."
  },
  {
    name: "Зенодот",
    greeting: "Здравствуйте, Зенодот!",
    roleLabel: "Zenodotus",
    info: "Первый директор Александрийской библиотеки, ввёл алфавитную каталогизацию."
  },
  {
    name: "Нэнси Пёрл",
    greeting: "Привет, Нэнси! Что сегодня посоветуешь?",
    roleLabel: "Nancy Pearl",
    info: "Книжная гуру и медиаперсона, автор 'Book Lust'."
  },
  {
    name: "Библиотекарь Невидимого Университета",
    greeting: "Ook! Вы вошли как Librarian.",
    roleLabel: "The Librarian",
    info: "Орангутан и самый любимый хранитель книг из Плоского мира."
  }
];

function AdminGreeting({ user }) {
  const [legend, setLegend] = useState(null);

  useEffect(() => {
    if (user?.role === 'admin') {
      const randomLegend = librarianLegends[Math.floor(Math.random() * librarianLegends.length)];
      setLegend(randomLegend);
    }
  }, [user?.role]);

  if (!legend) return null;

  return (
    <Box
      sx={{
        margin: '20px 0',
        padding: '12px 20px',
        background: '#f0f7ff',
        borderLeft: '5px solid #1565c0',
        borderRadius: '6px',
        animation: 'fadeIn 0.4s ease',
        '@keyframes fadeIn': {
          from: { opacity: 0, transform: 'translateY(-10px)' },
          to: { opacity: 1, transform: 'none' }
        }
      }}
    >
      <Typography variant="h5" component="h2" gutterBottom>
        {legend.greeting}
      </Typography>
      <Typography variant="body1">
        <strong>{legend.roleLabel}</strong>: {legend.info}
      </Typography>
    </Box>
  );
}

export default AdminGreeting; 