// client/src/components/CreateServiceForm.js
import React, { useState } from 'react';
import axios from 'axios';
import './CreateServiceForm.css'; // Estilos (opcional)

const CreateServiceForm = () => {
  // Obtenemos el user del localStorage (asumiendo que lo guardas al hacer login)
  const storedUser = JSON.parse(localStorage.getItem('user')) || null;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [deliveryTime, setDeliveryTime] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!storedUser) {
        return setMensaje('No estás autenticado o no eres profesional');
      }

      const res = await axios.post('http://localhost:4000/services', {
        user_id: storedUser.user_id,
        title,
        description,
        price,
        delivery_time: deliveryTime
      });

      setMensaje(res.data.message);
      // Opcional: limpiar campos
      setTitle('');
      setDescription('');
      setPrice('');
      setDeliveryTime('');
    } catch (error) {
      if (error.response) {
        setMensaje(error.response.data.error);
      } else {
        setMensaje('Error del servidor');
      }
    }
  };

  if (!storedUser) {
    return <p>Debes iniciar sesión para crear un servicio.</p>;
  }

  // (Opcional) Verificar si storedUser.tipo_usuario === 'profesional'
  // si no, return <p>No tienes permisos...</p>;

  return (
    <div className="create-service-container">
      <h2>Crear Servicio</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Descripción</label>
          <textarea
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Tiempo de Entrega</label>
          <input
            type="text"
            value={deliveryTime}
            onChange={(e) => setDeliveryTime(e.target.value)}
            className="form-input"
          />
        </div>

        <button type="submit" className="btn-submit">
          Crear
        </button>
      </form>
      {mensaje && <p className="form-message">{mensaje}</p>}
    </div>
  );
};

export default CreateServiceForm;
