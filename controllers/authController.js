const db = require('../config/db');
const bcrypt = require('bcryptjs');

// Registro de usuario
exports.registro = async (req, res) => {
    const { Nombre, Correo, Edad, Contraseña } = req.body;

    // Validar campos requeridos
    if (!Nombre || !Edad || !Correo || !Contraseña) {
        return res.status(400).json({ message: 'Por favor, complete todos los campos.' });
    }

    // Validar correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com)$/;
    if (!emailRegex.test(Correo)) {
        return res.status(400).json({ message: 'Por favor, ingrese un correo electrónico válido (Gmail, Yahoo Mail, Outlook).' });
    }

    // Validar contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,12}$/;
    if (!passwordRegex.test(Contraseña)) {
        return res.status(400).json({ message: 'La contraseña debe tener entre 6 y 12 caracteres, incluyendo letras mayúsculas, minúsculas y números.' });
    }

    try {
        // Comprobar conexión a la base de datos
        if (!db) {
            console.error('Database connection is not defined');
            return res.status(500).json({ message: 'Error en la conexión a la base de datos' });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(Contraseña, 10);

        // Insertar en la base de datos
        const sql = 'INSERT INTO usuario (Nombre, Edad, Correo, Contraseña) VALUES (?, ?, ?, ?)';
        db.query(sql, [Nombre, Edad, Correo, hashedPassword], (err) => {
            if (err) {
                if (err.code === 'ER_DUP_ENTRY') {
                    return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
                } else {
                    console.error('Error inserting into database:', err);
                    return res.status(500).json({ message: 'Error al registrar el usuario' });
                }
            }
            res.status(201).json({ message: 'Usuario registrado con éxito' });
        });
    } catch (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

// Iniciar sesión
exports.iniciarSesion = async (req, res) => {
    const { Correo, Contraseña } = req.body;

    // Validar campos requeridos
    if (!Correo || !Contraseña) {
        return res.status(400).json({ message: 'Por favor, complete ambos campos.' });
    }

    // Comprobar conexión a la base de datos
    if (!db) {
        console.error('Database connection is not defined');
        return res.status(500).json({ message: 'Error en la conexión a la base de datos' });
    }

    const sql = 'SELECT * FROM usuario WHERE Correo = ?';
    db.query(sql, [Correo], async (err, results) => {
        if (err) {
            console.error('Error querying the database:', err);
            return res.status(500).json({ message: 'Error al iniciar sesión' });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }

        const user = results[0];
        const passwordMatch = await bcrypt.compare(Contraseña, user.Contraseña);

        if (passwordMatch) {
            return res.json({ message: 'Inicio de sesión exitoso', userId: user.Id_usuario });
        } else {
            return res.status(401).json({ message: 'Correo o contraseña incorrectos' });
        }
    });
};
