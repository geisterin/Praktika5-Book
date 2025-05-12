import React, { useEffect, useState } from 'react';
import { commentService } from '../services/commentService';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const CommentList = (props) => {
  const { bookId, refresh } = props;
  const [comments, setComments] = useState([]);

  const loadComments = async () => {
    try {
      const data = await commentService.getBookComments(bookId);
      if (Array.isArray(data)) {
        setComments(data.reverse());
      } else {
        setComments([]);
        console.error('Ошибка: сервер вернул не массив', data);
      }
    } catch (error) {
      console.error('Ошибка при загрузке комментариев:', error);
    }
  };

  useEffect(() => {
    loadComments();
  }, [bookId, refresh]);

  return (
    <div className="comments-list">
      {comments.map((comment) => (
        <div key={comment.id} className="comment comment-card">
          <div className="comment-header">
            <div className="comment-user-block">
              <AccountCircleIcon className="comment-avatar" />
              <span className="username">
                <b>Почта:</b> {comment.user.email ? comment.user.email.split('@')[0] : comment.user.username}
              </span>
            </div>
            <span className="date"><b>Дата:</b> {new Date(comment.createdAt).toLocaleDateString()}</span>
          </div>
          <div className="comment-content">{comment.content}</div>
        </div>
      ))}
    </div>
  );
}; 