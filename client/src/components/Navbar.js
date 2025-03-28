// client/src/components/Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../Auth/useAuth';
import './Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout } = useAuth();

  const toggleMobileMenu = () => {
    setIsMobile(!isMobile);
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">MiMarketplace</Link>
      </div>
      <ul className={isMobile ? "navbar-links mobile" : "navbar-links"}>
        <li>
          <Link to="/" onClick={() => setIsMobile(false)}>Inicio</Link>
        </li>
        <li>
          <Link to="/services" onClick={() => setIsMobile(false)}>Servicios</Link>
        </li>
        {user && user.tipo_usuario === 'Profesional' && (
          <>
            <li>
              <Link to="/create-service" onClick={() => setIsMobile(false)}>Crear Servicio</Link>
            </li>
            <li>
              <Link to="/profile" onClick={() => setIsMobile(false)}>Perfil</Link>
            </li>
          </>
        )}
        {!user && (
          <>
            <li>
              <Link to="/login" onClick={() => setIsMobile(false)}>Iniciar Sesión</Link>
            </li>
            <li>
              <Link to="/register" onClick={() => setIsMobile(false)}>Registrarse</Link>
            </li>
          </>
        )}
        {user && (
          <li>
            <button className="logout-button" onClick={() => { logout(); setIsMobile(false); }}>
              Cerrar Sesión
            </button>
          </li>
        )}
      </ul>
      <button className="mobile-menu-icon" onClick={toggleMobileMenu}>
        {isMobile ? <>&#10005;</> : <>&#9776;</>}
      </button>
    </nav>
  );
};

export default Navbar;
