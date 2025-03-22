// server/routes/profile.routes.js

const express = require('express');
const router = express.Router();
const {
  upsertProfile,
  getProfileByUserId,
  deleteProfile
} = require('../controllers/profile.controller');

// POST o PUT: upsert (crear/actualizar) - usaremos POST
router.post('/', upsertProfile);

// GET: obtener perfil por user_id
router.get('/:user_id', getProfileByUserId);

// DELETE: eliminar perfil
router.delete('/:profile_id', deleteProfile);

module.exports = router;
