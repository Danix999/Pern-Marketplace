// server/db.js

const { Pool } = require('pg');

// Crea el pool de conexiones
const pool = new Pool({
  user: 'postgres',           // tu usuario de PostgreSQL
  host: 'localhost',          // host donde corre tu BD
  database: 'marketplace_db', // nombre de la base de datos que creaste
  password: '0100',  // contraseña que usas en pgAdmin
  port: 5432,                 // puerto por defecto de PostgreSQL
});

module.exports = pool;
