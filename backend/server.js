const express = require('express');
const cors = require('cors'); // Importa el paquete CORS
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes');

// Middleware para manejar JSON
app.use(express.json());

// Configura CORS
app.use(cors({ origin: 'http://localhost:3000' }));

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Rutas de usuario
app.use('/usuario', usuarioRoutes);

// Configuración del puerto
app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
