import axios from 'axios';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3001/articles';

export const getArticles = () => {
  return from(axios.get(API_URL)).pipe(
    map(response => Array.isArray(response.data) ? response.data : []) // Ensure array response
  );
};

// ... rest of your articleService.js remains the same ...

export const getArticleById = (id) => {
  return from(axios.get(`${API_URL}/${id}`)).pipe(
    map(response => response.data)
  );
};

export const createArticle = (article) => {
  return from(axios.post(API_URL, article)).pipe(
    map(response => response.data)
  );
};

export const updateArticle = (id, article) => {
  return from(axios.put(`${API_URL}/${id}`, article)).pipe(
    map(response => response.data)
  );
};

export const deleteArticle = (id) => {
  return from(axios.delete(`${API_URL}/${id}`)).pipe(
    map(response => response.data)
  );
};

export const searchArticles = (query) => {
  return from(axios.get(API_URL)).pipe(
    map(response => response.data.filter(article => 
      article.title.toLowerCase().includes(query.toLowerCase()) ||
      article.content.toLowerCase().includes(query.toLowerCase())
    ))
  );
};

export const filterArticlesByCategory = (categoryId) => {
  return from(axios.get(`${API_URL}?categoryId=${categoryId}`)).pipe(
    map(response => response.data)
  );
};
