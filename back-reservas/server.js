require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

/* Configurar CORS */
app.use(cors());

/* Lectura y parseo del body */
app.use(express.json());

app.use('/Reservas', require('./routes/Reservas'));
app.use('/Salones', require('./routes/Salones'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});