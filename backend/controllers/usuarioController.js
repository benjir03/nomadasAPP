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
            const formato_correo = `<!DOCTYPE html>
                <html>
                  <head>
                    <style>
                      body {
                        background-color: #ffffff;
                        font-family: HelveticaNeue, Helvetica, Arial, sans-serif;
                      }
                      .container {
                        background-color: #ffffff;
                        border: 1px solid #eee;
                        border-radius: 5px;
                        box-shadow: 0 5px 10px rgba(20, 50, 70, 0.2);
                        margin-top: 20px;
                        max-width: 360px;
                        margin: 0 auto;
                        padding: 68px 0 130px;
                      }
                      .logo {
                        margin: 0 auto;
                      }
                      .tertiary {
                        color: #0a85ea;
                        font-size: 11px;
                        font-weight: 700;
                        height: 16px;
                        line-height: 16px;
                        margin: 16px 8px 8px 8px;
                        text-transform: uppercase;
                        text-align: center;
                      }
                      .secondary {
                        color: #000;
                        font-size: 20px;
                        font-weight: 500;
                        line-height: 24px;
                        text-align: center;
                      }
                      .code-container {
                        background: rgba(0, 0, 0, 0.05);
                        border-radius: 4px;
                        margin: 16px auto 14px;
                        width: 280px;
                      }
                      .code {
                        color: #000;
                        font-size: 32px;
                        font-weight: 700;
                        letter-spacing: 6px;
                        line-height: 40px;
                        text-align: center;
                      }
                      .paragraph {
                        color: #444;
                        font-size: 15px;
                        line-height: 23px;
                        margin: 0;
                        text-align: center;
                        padding: 0 40px;
                      }
                      .link {
                        color: #444;
                        text-decoration: underline;
                      }
                      .footer {
                        color: #000;
                        font-size: 12px;
                        font-weight: 800;
                        line-height: 23px;
                        margin-top: 20px;
                        text-transform: uppercase;
                        text-align: center;
                      }
                    </style>
                  </head>
                  <body>
                    <div class="container">
                      <img
                        src="../imgs/LogoNoP.jpeg"
                        width="212"
                        height="88"
                        alt="Logo"
                        class="logo"
                      />
                      <p class="tertiary">Verifica Tu Correo</p>
                      <h1 class="secondary">
                        Haz click en el siguiente botón para verificar y acceder
                      </h1>
                      <div class="code-container">
                        <p class="code"></p>
                      </div>
                      <p class="paragraph">¿No esperabas este correo?</p>
                      <p class="paragraph">
                        Contacta
                        <a href="mailto:Nomadas@nomada.com" class="link">
                          Nomadas@nomada.com
                        </a>
                        si no esperabas esta verificación.
                      </p>
                    </div>
                    <p class="footer">¡El mundo no se va a conquistar solo!</p>
                  </body>
                </html>`;
            //Funcion envio de correo
            (async function () {
                const { data, error } = await resend.emails.send({
                    from: 'NomadasApp <onboarding@resend.dev>',
                    to: correo,
                    subject: 'Registro',
                    html: formato_correo,
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