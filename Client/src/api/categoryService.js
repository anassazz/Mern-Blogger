import axios from 'axios';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';

const API_URL = 'http://localhost:3001/categories';

export const getCategories = () => {
  return from(axios.get(API_URL)).pipe(
    map(response => response.data)
  );
};