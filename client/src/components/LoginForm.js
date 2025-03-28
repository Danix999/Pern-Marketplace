// client/src/components/LoginForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../Auth/useAuth';
import './LoginForm.css';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mensaje, setMensaje] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/auth/login', { email, password });
      setMensaje(res.data.message);
      // Llamamos a la función login del contexto para guardar el usuario
      login(res.data.user);
      navigate('/profile'); // Redirige a perfil u otra ruta privada
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
