// server/controllers/service.controller.js

const pool = require('../db');

// Crear un servicio
const createService = async (req, res) => {
  try {
    const { user_id, title, description, price, delivery_time } = req.body;

    // Validar campos
    if (!user_id || !title || !description || !price || !delivery_time) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // (Opcional) Verificar que el user sea tipo 'profesional'
    // Podrías hacer una consulta a la tabla users o confiar en el front
    // Ejemplo:
    // const userCheck = await pool.query('SELECT tipo_usuario FROM users WHERE user_id = $1', [user_id]);
    // if (userCheck.rows[0].tipo_usuario !== 'profesional') {
    //   return res.status(403).json({ error: 'Solo profesionales pueden crear servicios' });
    // }

    const newService = await pool.query(
      `INSERT INTO services (user_id, title, description, price, delivery_time)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [user_id, title, description, price, delivery_time]
    );

    return res.status(201).json({
      message: 'Servicio creado con éxito',
      service: newService.rows[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

// Listar todos los servicios
const getAllServices = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM services ORDER BY created_at DESC');
    return res.status(200).json({ services: result.rows });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener un servicio por ID
const getServiceById = async (req, res) => {
  try {
    const { service_id } = req.params;
    const result = await pool.query('SELECT * FROM services WHERE service_id = $1', [service_id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    return res.status(200).json({ service: result.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

// Actualizar un servicio
const updateService = async (req, res) => {
  try {
    const { service_id } = req.params;
    const { title, description, price, delivery_time } = req.body;

    // Verificar si existe
    const exist = await pool.query('SELECT * FROM services WHERE service_id = $1', [service_id]);
    if (exist.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    const updated = await pool.query(
      `UPDATE services
       SET title = $1,
           description = $2,
           price = $3,
           delivery_time = $4,
           updated_at = NOW()
       WHERE service_id = $5
       RETURNING *`,
      [title, description, price, delivery_time, service_id]
    );

    return res.status(200).json({
      message: 'Servicio actualizado',
      service: updated.rows[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

// Eliminar un servicio
const deleteService = async (req, res) => {
  try {
    const { service_id } = req.params;

    const exist = await pool.query('SELECT * FROM services WHERE service_id = $1', [service_id]);
    if (exist.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }

    await pool.query('DELETE FROM services WHERE service_id = $1', [service_id]);
    return res.status(200).json({ message: 'Servicio eliminado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
};
