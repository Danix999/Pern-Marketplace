// client/src/components/ServiceList.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ServiceList.css';

const ServiceList = () => {
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get('http://localhost:4000/services');
      setServices(res.data.services);
    } catch (error) {
      console.error(error);
    }
  };

  const handleGoBack = () => {
    navigate(-1); // o navigate('/');
  };

  return (
    <div className="service-list-container">
      <button onClick={handleGoBack} className="back-button">
        ← Volver
      </button>

      <h2 className="service-list-title">Servicios Disponibles</h2>
      {services.map((service) => (
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
      ))}
    </div>
  );
};

export default ServiceList;
