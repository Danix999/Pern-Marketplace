// server/routes/service.routes.js

const express = require('express');
const router = express.Router();
const {
  createService,
  getAllServices,
  getServiceById,
  updateService,
  deleteService
} = require('../controllers/service.controller');

// POST /services -> Crear un servicio
router.post('/', createService);

// GET /services -> Listar todos los servicios
router.get('/', getAllServices);

// GET /services/:service_id -> Obtener un servicio por ID
router.get('/:service_id', getServiceById);

// PUT /services/:service_id -> Actualizar un servicio
router.put('/:service_id', updateService);

// DELETE /services/:service_id -> Eliminar un servicio
router.delete('/:service_id', deleteService);

module.exports = router;
