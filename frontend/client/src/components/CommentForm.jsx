import React, { useState } from 'react';
import { commentService } from '../services/commentService';

export const CommentForm = (props) => {
  const { bookId, onCommentAdded } = props;
  const [content, setContent] = useState('');
  const user = localStorage.getItem('token');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await commentService.createComment(bookId, content);
      setContent('');
      onCommentAdded();
    } catch (error) {
      console.error('Ошибка при добавлении комментария:', error);
    }
  };

  if (!user) {
    return <p>Войдите, чтобы оставить комментарий</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Напишите ваш комментарий..."
        required
      />
      <button type="submit">Отправить</button>
    </form>
  );
}; 