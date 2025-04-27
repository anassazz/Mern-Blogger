import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../api/authService';

export const useAuth = () => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      setError(null);
      const newUser = await register(userData);
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      navigate('/articles');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      setError(null);
      const loggedInUser = await login(credentials);
      if (loggedInUser) {
        setUser(loggedInUser);
        localStorage.setItem('user', JSON.stringify(loggedInUser));
        navigate(location.state?.from?.pathname || '/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  return { user, error, handleRegister, handleLogin, logout };
};