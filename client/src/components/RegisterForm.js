// client/src/components/RegisterForm.js

import React, { useState } from 'react';
import axios from 'axios';
import './RegisterForm.css'; // Importamos el CSS específico

const RegisterForm = () => {
  // NOTA: la columna en la BD se llama 'name'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [tipoUsuario, setTipoUsuario] = useState('Cliente');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviamos 'name' en vez de 'nombre'
      const res = await axios.post('http://localhost:4000/auth/register', {
        name,
        email,
        password,
        tipo_usuario: tipoUsuario
      });
      setMensaje(res.data.message);
    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.error);
      } else {
        setMensaje('Error del servidor');
      }
    }
  };

  return (
    <div className="register-form-container">
      <h2 className="form-title">Registro</h2>
      {/* Asegúrate de abrir y cerrar bien el form */}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input
            type="text"
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

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

        <div className="form-group">
          <label>Tipo de Usuario</label>
          <select
            className="form-input"
            value={tipoUsuario}
            onChange={(e) => setTipoUsuario(e.target.value)}
          >
            <option value="Cliente">Cliente</option>
            <option value="Profesional">Profesional</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">
          Registrar
        </button>
      </form>
      {/* Mensaje de respuesta */}
      {mensaje && <p className="form-message">{mensaje}</p>}
    </div>
  );
};

export default RegisterForm;
