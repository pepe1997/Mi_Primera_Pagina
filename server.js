const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');  // Importamos Mongoose para trabajar con MongoDB

const app = express();
const port = 3000;  // Puerto en el que estará corriendo el servidor

// Middleware para manejar solicitudes JSON y CORS
app.use(bodyParser.json());
app.use(cors());

// Conexión a MongoDB (sin las opciones deprecated)
mongoose.connect('mongodb://localhost:27017/fundacion-sf')
  .then(() => {
    console.log('Conectado a MongoDB');
  })
  .catch((err) => {
    console.log('Error al conectar a MongoDB:', err);
  });

// Esquema de usuario de MongoDB
const usuarioSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Modelo de usuario basado en el esquema
const Usuario = mongoose.model('Usuario', usuarioSchema);

// Ruta para registrar un usuario
app.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const userExists = await Usuario.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario
    const nuevoUsuario = new Usuario({
      name,
      email,
      password: hashedPassword
    });

    // Guardar al usuario en la base de datos
    await nuevoUsuario.save();

    res.status(201).json({ message: 'Usuario registrado con éxito' });
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar el usuario', details: err });
  }
});

// Ruta para iniciar sesión
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Buscar al usuario en la base de datos
    const user = await Usuario.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Usuario no encontrado' });
    }

    // Verificar la contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Contraseña incorrecta' });
    }

    // Crear un token JWT con el nombre del usuario en el payload
    const token = jwt.sign(
      { 
        userId: user._id,  // ID del usuario
        name: user.name,    // Nombre del usuario
        email: user.email   // Correo del usuario
      }, 
      'secreto',  // Esta es tu clave secreta para la firma del token
      { expiresIn: '1h' } // Tiempo de expiración del token
    );

    // Enviar el token al frontend
    res.json({ message: 'Inicio de sesión exitoso', token });
  } catch (err) {
    res.status(500).json({ error: 'Error al iniciar sesión', details: err });
  }
});


// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
