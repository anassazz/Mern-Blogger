import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register, login } from '../api/authService';

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleRegister = async (userData) => {
    try {
      const newUser = await register(userData);
      setUser(newUser);
      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleLogin = async (credentials) => {
    try {
      const loggedInUser = await login(credentials);
      if (loggedInUser) {
        setUser(loggedInUser);
        navigate('/');
      } else {
        setError('Invalid credentials');
      }
    } catch (err) {
      setError(err.message);
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/login');
  };

  return { user, error, handleRegister, handleLogin, logout };
};