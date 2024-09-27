


const express = require('express');

require('dotenv').config();
const cors = require('cors')

const { dbConnection } = require('./database/config')

// Crear servidor Express
const app = express();

//Configurar CORS
app.use(cors());

// Lectura y parseo de body
app.use( express.json() );

// Base de datos
dbConnection();


// Rutas
app.use('/api/users', require('./routes/users'));
app.use('/api/hospitals', require('./routes/hospitals'));
app.use('/api/doctors', require('./routes/doctors'));

app.use('/api/search', require('./routes/searchs'));
app.use('/api/uploads', require('./routes/uploads'));


app.use('/api/login', require('./routes/auth'));



app.listen(process.env.PORT, () => console.log('Servidor corriendo en el puerto: ' + process.env.PORT))