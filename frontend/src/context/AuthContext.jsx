import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as fakeStoreLogin, getUserById } from '../services/fakeStoreApi';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const userData = localStorage.getItem('userData');
    
    if (token && userId && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      // Login to FakeStoreAPI
      const tokenData = await fakeStoreLogin(username, password);
      
      // Try to get user by username from FakeStoreAPI users
      // For demo, we'll use a default user ID based on common FakeStoreAPI test users
      // Common test usernames: mor_2314, donero, etc.
      let userId = 1; // Default
      try {
        const users = await getUserById(1); // Try to get first user as demo
        // In real app, you'd search by username
        userId = users.id || 1;
      } catch (e) {
        // If fails, use default
        userId = 1;
      }
      
      const userData = {
        id: userId,
        username: username,
        token: tokenData.token,
      };

      localStorage.setItem('token', tokenData.token);
      localStorage.setItem('userId', userData.id);
      localStorage.setItem('userData', JSON.stringify(userData));
      setUser(userData);
      
      return userData;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginWithUser = async (userId) => {
    try {
      const userData = await getUserById(userId);
      const userWithToken = {
        ...userData,
        token: localStorage.getItem('token') || 'demo-token',
      };
      
      localStorage.setItem('userId', userId);
      localStorage.setItem('userData', JSON.stringify(userWithToken));
      setUser(userWithToken);
      
      return userWithToken;
    } catch (error) {
      console.error('Error fetching user:', error);
      throw error;
    }
  };

  const register = async (userData) => {
    // FakeStoreAPI doesn't have register endpoint
    // For demo, we'll just save locally
    const newUser = {
      id: Date.now(),
      ...userData,
      token: 'demo-token-' + Date.now(),
    };
    
    localStorage.setItem('token', newUser.token);
    localStorage.setItem('userId', newUser.id);
    localStorage.setItem('userData', JSON.stringify(newUser));
    setUser(newUser);
    
    return newUser;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userData');
    localStorage.removeItem('cart');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, loginWithUser, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

