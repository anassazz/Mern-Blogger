import { useState, useEffect } from 'react';
import { getCommentsByArticle, addComment, deleteComment } from '../api/commentService';

export const useComments = (articleId) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (articleId) {
      fetchComments();
    }
  }, [articleId]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      const subscription = getCommentsByArticle(articleId).subscribe({
        next: (data) => setComments(data),
        error: (err) => setError(err.message),
        complete: () => setLoading(false)
      });
      return () => subscription.unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const postComment = async (comment) => {
    try {
      const newComment = await addComment({
        ...comment,
        articleId,
        createdAt: new Date().toISOString()
      }).toPromise();
      setComments([...comments, newComment]);
    } catch (err) {
      setError(err.message);
    }
  };

  const removeComment = async (id) => {
    try {
      await deleteComment(id).toPromise();
      setComments(comments.filter(comment => comment.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  return { comments, loading, error, postComment, removeComment };
};