import { useState, useEffect } from 'react';
import { 
  getArticles, 
  createArticle, 
  updateArticle, 
  deleteArticle,
  searchArticles,
  filterArticlesByCategory,
  likeArticle,
  bookmarkArticle
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
      setArticles(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  const addArticle = async (article) => {
    try {
      const newArticle = await createArticle(article).toPromise();
      setArticles(prev => [...prev, newArticle]);
      return newArticle;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const editArticle = async (id, updatedArticle) => {
    try {
      const updated = await updateArticle(id, updatedArticle).toPromise();
      setArticles(prev => prev.map(article => 
        article.id === id ? updated : article
      ));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const removeArticle = async (id) => {
    try {
      await deleteArticle(id).toPromise();
      setArticles(prev => prev.filter(article => article.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
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

  const like = async (id) => {
    try {
      const updated = await likeArticle(id).toPromise();
      setArticles(prev => prev.map(article => 
        article.id === id ? updated : article
      ));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const bookmark = async (id) => {
    try {
      const updated = await bookmarkArticle(id).toPromise();
      setArticles(prev => prev.map(article => 
        article.id === id ? updated : article
      ));
      return updated;
    } catch (err) {
      setError(err.message);
      throw err;
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
    fetchArticles,
    likeArticle: like,
    bookmarkArticle: bookmark
  };
};