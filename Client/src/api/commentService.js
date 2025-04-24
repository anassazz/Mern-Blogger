import axios from 'axios';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3001/comments';

export const getCommentsByArticle = (articleId) => {
  return from(axios.get(`${API_URL}?articleId=${articleId}`)).pipe(
    map(response => response.data)
  );
};

export const addComment = (comment) => {
  return from(axios.post(API_URL, comment)).pipe(
    map(response => response.data)
  );
};

export const deleteComment = (id) => {
  return from(axios.delete(`${API_URL}/${id}`)).pipe(
    map(response => response.data)
  );
};