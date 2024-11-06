const express = require('express'); // Importa el paquete EXPRESS
const cors = require('cors'); // Importa el paquete CORS
const cookieParser = require('cookie-parser'); // Importa el paquete COOKIE PARSER
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes'); //Rutas de usuario
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación

// Middleware para manejar JSON
app.use(express.json());

// COKKIEPARSER
app.use(cookieParser());

// Configura CORS
app.use(cors({
    origin: 'http://localhost:3000', // Asegúrate de que el origen sea el correcto
    credentials: true // Permite el envío de cookies y credenciales en CORS
}));

// Ruta de prueba para la raíz
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente');
});

// Rutas de usuario
app.use('/usuario', usuarioRoutes);

// Rutas de autenticación
app.use('/auth', authRoutes);

// Configuración del puerto
app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});