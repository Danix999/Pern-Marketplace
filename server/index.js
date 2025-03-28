// server/index.js
const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const serviceRoutes = require('./routes/service.routes');
const contractRoutes = require('./routes/contract.routes'); // <--

app.use(cors());
app.use(express.json());

// Rutas
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);
app.use('/services', serviceRoutes);
app.use('/contracts', contractRoutes); // <--

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
