// client/src/Auth/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from './useAuth';

const PrivateRoute = ({ children, roleRequired }) => {
  const { user } = useAuth();

  // Si el usuario no está autenticado, redirige a login.
  if (!user) {
    return <Navigate to="/login" />;
  }

  // Si se requiere un rol específico y el usuario no lo tiene, redirige al home.
  if (roleRequired && user.tipo_usuario !== roleRequired) {
    return <Navigate to="/" />;
  }

  // Si todo está OK, renderiza el contenido de la ruta protegida.
  return children;
};

export default PrivateRoute;
