import axiosInstance from './axios';

export const uploadImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    const response = await axiosInstance.post('/api/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.data && response.data.path) {
      // Формируем полный URL для изображения
      const imageUrl = `http://localhost:3000${response.data.path}`;
      return imageUrl;
    }
    
    throw new Error('Не удалось получить путь к изображению');
  } catch (error) {
    console.error('Ошибка при загрузке изображения:', error);
    throw error;
  }
}; 