// useComments.js
import { useState, useEffect } from 'react';
import { getCommentsByArticle, addComment, deleteComment } from '../api/commentService';
import { useAuth } from './useAuth';

export const useComments = (articleId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const data = await getCommentsByArticle(articleId).toPromise();
      setComments(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const postComment = async (comment) => {
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    try {
      const newComment = await addComment({
        ...comment,
        articleId,
        userId: currentUser.id,
        author: currentUser.name,
        createdAt: new Date().toISOString()
      }).toPromise();
      setComments(prev => [...prev, newComment]);
      return newComment;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeComment = async (id) => {
    try {
      await deleteComment(id).toPromise();
      setComments(prev => prev.filter(comment => comment.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { comments, loading, error, postComment, removeComment };
};