// client/src/Auth/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

// Creamos el contexto de autenticación
export const AuthContext = createContext();

// Provider para envolver la app y proveer el estado de autenticación
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Al montar, revisa localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Función para loguear y guardar el usuario
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  // Función para cerrar sesión
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
