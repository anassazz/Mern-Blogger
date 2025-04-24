import axios from 'axios';

const API_URL = 'http://localhost:3001/users';

export const register = async (userData) => {  
  const response = await axios.post(API_URL, userData);
  return response.data;
};

export const login = async (credentials) => {
  const response = await axios.get(API_URL);
  const users = response.data;
  return users.find(user => 
    user.email === credentials.email && 
    user.password === credentials.password
  );
};