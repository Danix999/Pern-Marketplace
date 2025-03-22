// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';       // Ejemplo
import ServiceList from './components/ServiceList'; // Lista de servicios
import CreateServiceForm from './components/CreateServiceForm';
import ProfilePage from './components/ProfilePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

import './App.css';

function App() {
  return (
    <div className="app-container">
      <Router>
        {/* Navbar siempre visible */}
        <Navbar />

        {/* Rutas */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServiceList />} />
          <Route path="/create-service" element={<CreateServiceForm />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
