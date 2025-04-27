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
      const data = await getArticles().toPromise();
      setArticles(Array.isArray(data) ? data : []); // Ensure articles is always an array
    } catch (err) {
      setError(err.message);
      setArticles([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const addArticle = async (article) => {
    try {
      const newArticle = await createArticle(article).toPromise();
      setArticles(prev => [...prev, newArticle]);
    } catch (err) {
      setError(err.message);
    }
  };

  const editArticle = async (id, updatedArticle) => {
    try {
      const updated = await updateArticle(id, updatedArticle).toPromise();
      setArticles(prev => prev.map(article => 
        article.id === id ? updated : article
      ));
    } catch (err) {
      setError(err.message);
    }
  };

  const removeArticle = async (id) => {
    try {
      await deleteArticle(id).toPromise();
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  const search = async (query) => {
    try {
      const results = await searchArticles(query).toPromise();
      setArticles(Array.isArray(results) ? results : []);
    } catch (err) {
      setError(err.message);
    }
  };

  const filterByCategory = async (categoryId) => {
    try {
      const filtered = await filterArticlesByCategory(categoryId).toPromise();
      setArticles(Array.isArray(filtered) ? filtered : []);
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