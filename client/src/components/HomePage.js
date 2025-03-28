// client/src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="hero-container">
      <div className="hero-overlay">
        <h1 className="hero-title">Bienvenido a Mi Marketplace</h1>
        <p className="hero-subtitle">
          Descubre servicios profesionales y conecta con los mejores expertos.
        </p>
        <div className="hero-buttons">
          <Link to="/register" className="btn btn-primary">Regístrate</Link>
          <Link to="/login" className="btn btn-secondary">Inicia Sesión</Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
