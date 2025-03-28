// server/routes/contract.routes.js
const express = require('express');
const router = express.Router();
const {
  createContract,
  getContractsByClient,
  getContractsByProfessional,
  payContract,
  completeContract
} = require('../controllers/contract.controller');

// POST /contracts -> Crear un contrato
router.post('/', createContract);


// POST /contracts -> crear un contrato (el cliente contrata un servicio)
//router.post('/', createContract);

// GET /contracts/client -> obtener contratos de un cliente
//router.get('/client', getContractsByClient);

// GET /contracts/professional -> obtener contratos de un profesional
//router.get('/professional', getContractsByProfessional);

// PUT /contracts/:contract_id/pay -> simular pago de un contrato
//router.put('/:contract_id/pay', payContract);

// PUT /contracts/:contract_id/complete -> marcar el servicio como completado
//router.put('/:contract_id/complete', completeContract);

module.exports = router;

