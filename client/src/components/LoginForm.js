// client/src/components/LoginForm.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');

  // Hook de React Router para navegar a otras rutas
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/auth/login', {
        email,
        password
      });
      setMensaje(res.data.message);

      // Guardar datos del usuario en localStorage (o en un contexto global, si prefieres)
      localStorage.setItem('user', JSON.stringify(res.data.user));

      // Redirigir a /profile
      navigate('/profile');
    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.error);
      } else {
        setMensaje('Error del servidor');
      }
    }
  };

  return (
    <div className="login-form-container">
      <h2 className="form-title">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Correo Electrónico</label>
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Contraseña</label>
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit">
          Entrar
        </button>
      </form>
      {mensaje && <p className="form-message">{mensaje}</p>}
    </div>
  );
};

export default LoginForm;
