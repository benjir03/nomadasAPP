const express = require('express');
const app = express();
const Sequelize = require('sequelize');

// Configuración de conexión a la base de datos
const sequelize = new Sequelize('nombre_bd', 'usuario', 'contraseña', {
  host: 'localhost', // Cambia por tu host si es necesario
  dialect: 'mysql', // Cambia según el tipo de base de datos (mysql, postgres, etc.)
});

// Verifica la conexión a la base de datos
sequelize.authenticate()
  .then(() => console.log('Conexión a la base de datos exitosa'))
  .catch((error) => console.error('Error al conectar a la base de datos:', error));

app.use(express.json()); // Middleware para parsear JSON

// Rutas API
app.get('/api/users', async (req, res) => {
  try {
    const users = await sequelize.query('SELECT * FROM users', { type: Sequelize.QueryTypes.SELECT });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
});

// Iniciar el servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
