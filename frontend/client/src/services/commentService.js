export const commentService = {
  async getBookComments(bookId) {
    const response = await fetch(`http://localhost:3000/api/books/${bookId}/comments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return await response.json();
  },

  async createComment(bookId, content) {
    const response = await fetch(`http://localhost:3000/api/books/${bookId}/comments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({ content })
    });
    return await response.json();
  }
}; 