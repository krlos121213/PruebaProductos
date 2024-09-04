const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const productoRoutes = require('./routes/productoRoutes');
const errorHandler = require('./middleware/errorHandler');
const { mongoURI } = require('./config/config.js');


app.use(bodyParser.json());

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});

// Conectar a la base de datos
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Conectado a MongoDB');

        // Rutas
        app.use('/productos', productoRoutes);
        
        // Manejo de errores
        app.use(errorHandler);

        
    })
    .catch(err => {
        console.error('Error al conectar a MongoDB:', err);
    });

