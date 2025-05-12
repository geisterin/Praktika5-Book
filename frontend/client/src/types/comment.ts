export interface Comment {
  id: number;
  content: string;
  bookId: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    username: string;
  };
} 