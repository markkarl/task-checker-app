// frontend/src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

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

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
// frontend/src/context/AuthContext.js
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

// In AuthProvider:
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

export { AuthProvider, AuthContext };
