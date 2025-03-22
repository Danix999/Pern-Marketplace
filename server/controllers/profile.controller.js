// server/controllers/profile.controller.js

const pool = require('../db');

// Crear o actualizar el perfil
// Para simplificar, usaremos "upsert": si no existe, lo crea; si existe, lo actualiza.
const upsertProfile = async (req, res) => {
  try {
    const { user_id, photo_url, description, experience, skills } = req.body;

    // Validar que user_id no sea vacío
    if (!user_id) {
      return res.status(400).json({ error: 'Falta user_id' });
    }

    // Verificar si el perfil ya existe
    const existingProfile = await pool.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [user_id]
    );

    if (existingProfile.rows.length > 0) {
      // Actualizar
      const profile_id = existingProfile.rows[0].profile_id;
      const updateProfile = await pool.query(
        `UPDATE profiles
         SET photo_url = $1,
             description = $2,
             experience = $3,
             skills = $4,
             updated_at = NOW()
         WHERE profile_id = $5
         RETURNING *`,
        [photo_url, description, experience, skills, profile_id]
      );
      return res.status(200).json({
        message: 'Perfil actualizado',
        profile: updateProfile.rows[0]
      });
    } else {
      // Crear
      const newProfile = await pool.query(
        `INSERT INTO profiles (user_id, photo_url, description, experience, skills)
         VALUES ($1, $2, $3, $4, $5)
         RETURNING *`,
        [user_id, photo_url, description, experience, skills]
      );
      return res.status(201).json({
        message: 'Perfil creado',
        profile: newProfile.rows[0]
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

// Obtener el perfil por user_id
const getProfileByUserId = async (req, res) => {
  try {
    const { user_id } = req.params;

    const profileResult = await pool.query(
      'SELECT * FROM profiles WHERE user_id = $1',
      [user_id]
    );
    if (profileResult.rows.length === 0) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    return res.status(200).json({ profile: profileResult.rows[0] });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

// (Opcional) Eliminar perfil
const deleteProfile = async (req, res) => {
  try {
    const { profile_id } = req.params;

    await pool.query('DELETE FROM profiles WHERE profile_id = $1', [profile_id]);
    return res.status(200).json({ message: 'Perfil eliminado' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  upsertProfile,
  getProfileByUserId,
  deleteProfile
};
