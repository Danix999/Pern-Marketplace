// client/src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">MiMarketplace</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/services">Servicios</Link>
        </li>
        <li>
          <Link to="/create-service">Crear Servicio</Link>
        </li>
        <li>
          <Link to="/profile">Perfil</Link>
        </li>
        <li>
          <Link to="/login">Iniciar Sesión</Link>
        </li>
        <li>
          <Link to="/register">Registrarse</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
