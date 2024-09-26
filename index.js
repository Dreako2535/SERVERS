const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const forumRoutes = require('./routes/forumRoutes');
require('dotenv').config();


app.use(express.json());


app.use('/api/auth', authRoutes);


app.use('/api/forum', forumRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
