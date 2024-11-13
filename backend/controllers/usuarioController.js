// controllers/usuarioController.js
const jwt = require('jsonwebtoken');
const pool = require('../db/connection');
const { Resend } = require('resend');
//API Resend (correo)
const resend = new Resend('re_5QN9cfnr_KE9jvjvkwRQdJ9FYxUy4hvsJ');

exports.insertarUsuario = (req, res) => {
    const { nombre, apellido, fecha_nacimiento, correo, contraseña, genero, telefono } = req.body;

    pool.query(
        'INSERT INTO USUARIO (nombre, apellido, fecha_nacimiento, email, password_user, genero, telefono, verificado) VALUES (?, ?, ?, ?, ?, ?, ?, 0)',
        [nombre, apellido,fecha_nacimiento, correo, contraseña, genero, telefono],
        (err, results) => {
            if (err) {
                console.error('Error en la inserción:', err);
                return res.status(500).json({ error: 'Error en la inserción' });
            }

            const userId = results.insertId;
            const token = jwt.sign({ id_usuario: userId }, 'tu_secreto', { expiresIn: '1h' });

            // Envía el token en una cookie y en la respuesta JSON
            res.cookie('sessionToken', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 3600000 // 1 hora
            });
            //Funcion envio de correo
            (async function () {
                const { data, error } = await resend.emails.send({
                    from: 'NomadasApp <onboarding@resend.dev>',
                    to: correo,
                    subject: 'Registro',
                    react: 'Holaaaaaaaaa',
                });
                if (error) {
                    return console.error({ error });
                }
                console.log({ data });
            })();
            
            res.json({ message: 'Usuario registrado y autenticado', id: userId, token });
        }
    );
};