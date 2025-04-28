import axios from 'axios';

const API_URL = '/api/users'; // Utilise le proxy Vite

export const register = async (userData) => {
  try {
    const response = await axios.post('http://localhost:3001/users', {
      ...userData,
      id: Date.now(), // Génère un ID unique
      createdAt: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error(error.response?.data?.message || 'Registration failed. Server may be down.');
  }
};

export const login = async (credentials) => {
  try {
    const response = await axios.get(API_URL);
    const user = response.data.find(u => 
      u.email === credentials.email && 
      u.password === credentials.password
    );
    if (!user) throw new Error('Invalid email or password');
    return user;
  } catch (error) {
    console.error('Login error:', error);
    throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
  }
};