import { useState, useEffect } from 'react';
import { 
  getArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle,
  searchArticles,
  filterArticlesByCategory
} from '../api/articleService';

export const useArticles = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const subscription = getArticles().subscribe({
        next: (data) => setArticles(data),
        error: (err) => setError(err.message),
        complete: () => setLoading(false)
      });
      return () => subscription.unsubscribe();
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const addArticle = async (article) => {
    try {
      const newArticle = await createArticle(article).toPromise();
      setArticles([...articles, newArticle]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editArticle = async (id, updatedArticle) => {
    try {
      const updated = await updateArticle(id, updatedArticle).toPromise();
      setArticles(articles.map(article => 
        article.id === id ? updated : article
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeArticle = async (id) => {
    try {
      await deleteArticle(id).toPromise();
      setArticles(articles.filter(article => article.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const search = async (query) => {
    try {
      const results = await searchArticles(query).toPromise();
      setArticles(results);
    } catch (err) {
      setError(err.message);
    }
  };

  const filterByCategory = async (categoryId) => {
    try {
      const filtered = await filterArticlesByCategory(categoryId).toPromise();
      setArticles(filtered);
    } catch (err) {
      setError(err.message);
    }
  };

  return { 
    articles, 
    loading, 
    error, 
    addArticle, 
    editArticle, 
    removeArticle, 
    search, 
    filterByCategory,
    fetchArticles
  };
};