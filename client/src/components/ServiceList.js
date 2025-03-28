import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ServiceList.css';

const ServiceList = () => {
  const [services, setServices] = useState([]); // Lista de todos los servicios
  const [filteredServices, setFilteredServices] = useState([]); // Lista filtrada de servicios
  const [query, setQuery] = useState(''); // Estado para manejar la palabra clave de búsqueda
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  // Obtener servicios desde la API
  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:4000/services');
      setServices(res.data.services);
      setFilteredServices(res.data.services); // Inicialmente, todos los servicios están disponibles
    } catch (error) {
      console.error(error);
    }
  };

  // Filtrar servicios basados en la palabra clave
  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setQuery(searchTerm);

    // Filtrar servicios según el título o descripción
    const filtered = services.filter((service) =>
      service.title.toLowerCase().includes(searchTerm) ||
      service.description.toLowerCase().includes(searchTerm)
    );

    setFilteredServices(filtered);
  };

  const handleGoBack = () => {
    navigate(-1); // o navigate('/'); dependiendo de cómo quieras que funcione el botón
  };

  return (
    <div className="service-list-container">
      <button onClick={handleGoBack} className="back-button">
        ← Volver
      </button>

      <h2 className="service-list-title">Servicios Disponibles</h2>

      {/* Campo de búsqueda */}
      <input
        type="text"
        placeholder="Buscar por palabra clave (ej. diseño de logos)"
        value={query}
        onChange={handleSearchChange}
        className="search-input"
      />

      {/* Mostrar servicios filtrados */}
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <div key={service.service_id} className="service-card">
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <p className="service-price">
              Precio: <span>${service.price}</span>
            </p>
            <p className="service-delivery">
              Tiempo de entrega: <span>{service.delivery_time}</span>
            </p>
          </div>
        ))
      ) : (
        <p>No se encontraron servicios que coincidan con tu búsqueda.</p>
      )}
    </div>
  );
};

export default ServiceList;
