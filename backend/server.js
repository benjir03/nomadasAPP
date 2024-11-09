const express = require('express'); // Importa el paquete EXPRESS
const cors = require('cors'); // Importa el paquete CORS
const cookieParser = require('cookie-parser'); // Importa el paquete COOKIE PARSER
const app = express();
const usuarioRoutes = require('./routes/usuarioRoutes'); //Rutas de usuario
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const bitacoraRoutes = require('./routes/bitacoraRoutes'); // Rutas de bitacora
const opinionesRoutes = require('./routes/opinionesRoutes'); // Rutas de opiniones
require('dotenv').config();
const carouselRoutes = require('./routes/carouselRoutes'); // Rutas de autenticación


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


// Rutas que manejan la bitácora de viajes
app.use('/bitacora', bitacoraRoutes);

// Rutas que manejan las opiniones
app.use('/opiniones', opinionesRoutes);

// Rutas de carousel
app.use('/carousel', carouselRoutes);

// Configuración del puerto
app.listen(3001, () => {
    console.log('Servidor corriendo en el puerto 3001');
});
