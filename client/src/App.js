// client/src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './Auth/AuthContext';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ServiceList from './components/ServiceList';
import CreateServiceForm from './components/CreateServiceForm';
import ProfilePage from './components/ProfilePage';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS
import './App.css';

function App() {
  return (
    <div className="app-container">
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServiceList />} />
            <Route path="/create-service" element={<CreateServiceForm />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="*" element={<h2 style={{ textAlign: 'center' }}>404 - Página no encontrada</h2>} />
          </Routes>
        </Router>
      </AuthProvider>

      {/* ToastContainer: necesario para mostrar notificaciones */}
      <ToastContainer 
        position="top-right"
        autoClose={3000} 
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
}

export default App;
