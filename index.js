


const express = require('express');

require('dotenv').config();
const cors = require('cors')

const {dbConnection} = require('./database/config')

// Crear servidor Express
const app = express();

//Configurar CORS
app.use( cors() );

// Base de datos
dbConnection();

console.log( process.env);

//fBqorYTccnUb2lvR
//mean_user

// Rutas

app.get('/', (req, res) => {
    res.json({
        ok: true,
        msj: 'Hola mundo'
    })
});


app.listen(3000, () => console.log('Servidor corriendo en el puerto ' + process.env.PORT))