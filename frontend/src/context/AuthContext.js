import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';

// Ensure the import statements are at the top
const socket = io('http://localhost:5000');

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password });
    setUser(response.data);
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to socket server');
    });

    socket.on('disconnect', () => {
      console.log('disconnected from socket server');
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
