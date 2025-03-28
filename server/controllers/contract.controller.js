// server/controllers/contract.controller.js
const pool = require('../db');

// Crear un contrato (el cliente contrata un servicio)
const createContract = async (req, res) => {
  try {
    // Tomamos service_id y client_id desde el body
    const { service_id, client_id } = req.body;

    // Validar que existan
    if (!service_id || !client_id) {
      return res.status(400).json({ error: 'Faltan campos (service_id, client_id)' });
    }

    // 1. Obtener info del servicio para saber quién es el profesional
    const serviceResult = await pool.query(
      'SELECT user_id FROM services WHERE service_id = $1',
      [service_id]
    );
    if (serviceResult.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    const professional_id = serviceResult.rows[0].user_id;

    // 2. Crear el contrato
    const newContract = await pool.query(
      `INSERT INTO contracts (service_id, client_id, professional_id)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [service_id, client_id, professional_id]
    );

    return res.status(201).json({
      message: 'Contrato creado con éxito',
      contract: newContract.rows[0]
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

// (Opcional) Obtener contratos de un cliente
const getContractsByClient = async (req, res) => {
  // ...
};

// (Opcional) Obtener contratos de un profesional
const getContractsByProfessional = async (req, res) => {
  // ...
};

// (Opcional) Pagar un contrato
const payContract = async (req, res) => {
  // ...
};

// (Opcional) Completar un contrato
const completeContract = async (req, res) => {
  // ...
};

module.exports = {
  createContract,
  getContractsByClient,
  getContractsByProfessional,
  payContract,
  completeContract
};
