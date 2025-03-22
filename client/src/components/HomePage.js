// client/src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Bienvenido a Mi Marketplace</h1>
      <p>¿Eres nuevo? <Link to="/register">Regístrate</Link></p>
      <p>¿Ya tienes cuenta? <Link to="/login">Inicia Sesión</Link></p>
    </div>
  );
};

export default HomePage;
