// server/controllers/auth.controller.js

const pool = require('../db');  // Importamos la conexión a la BD
const bcrypt = require('bcrypt');

// Controlador para Registrar Usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password, tipo_usuario } = req.body;

    // Validar que los campos no estén vacíos
    if (!name || !email || !password || !tipo_usuario) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Verificar si el usuario ya existe (email repetido)
    const userExists = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (userExists.rows.length > 0) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insertar el nuevo usuario en la BD
    const newUser = await pool.query(
      `INSERT INTO users (name, email, password, tipo_usuario)
       VALUES ($1, $2, $3, $4)
       RETURNING *`,
      [name, email, hashedPassword, tipo_usuario]
    );

    // Devolvemos el usuario creado (sin exponer la contraseña)
    return res.status(201).json({
      message: 'Usuario registrado con éxito',
      user: {
        user_id: newUser.rows[0].user_id,
        name: newUser.rows[0].name,
        email: newUser.rows[0].email,
        tipo_usuario: newUser.rows[0].tipo_usuario
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

// Controlador para Iniciar Sesión
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    // Buscar al usuario por su email
    const userResult = await pool.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    if (userResult.rows.length === 0) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    const user = userResult.rows[0];

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }

    // Inicio de sesión exitoso
    return res.status(200).json({
      message: 'Inicio de sesión exitoso',
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        tipo_usuario: user.tipo_usuario
      }
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error del servidor' });
  }
};

module.exports = {
  registerUser,
  loginUser
};
