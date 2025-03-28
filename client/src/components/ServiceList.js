// client/src/components/ServiceList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';  // Importar
import './ServiceList.css';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:4000/services');
      setServices(res.data.services);
    } catch (error) {
      console.error(error);
      toast.error('Error al cargar servicios');
    }
  };

  const handleContract = async (service_id) => {
    try {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      const client_id = storedUser?.user_id;

      if (!client_id) {
        toast.warn('No hay usuario logueado');
        return;
      }

      const res = await axios.post('http://localhost:4000/contracts', {
        service_id,
        client_id
      });
      toast.success('Contrato creado: ' + res.data.message);
    } catch (error) {
      console.error(error);
      toast.error('Error al crear el contrato');
    }
  };

  const filteredServices = services.filter((service) =>
    service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="service-list-container">
      <h2 className="service-list-title">Servicios Disponibles</h2>
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Buscar servicios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
      {filteredServices.length > 0 ? (
        filteredServices.map((service) => (
          <div key={service.service_id} className="service-card">
            <h3 className="service-title">{service.title}</h3>
            <p className="service-description">{service.description}</p>
            <p className="service-price">Precio: <span>${service.price}</span></p>
            <p className="service-delivery">Tiempo de entrega: <span>{service.delivery_time}</span></p>
            <button
              className="btn btn-primary"
              onClick={() => handleContract(service.service_id)}
            >
              Contratar
            </button>
          </div>
        ))
      ) : (
        <p className="no-results">No se encontraron servicios.</p>
      )}
    </div>
  );
};

export default ServiceList;
