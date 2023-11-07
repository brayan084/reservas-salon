const { dbConnection } = require('../config/database'); 
const { DataTypes } = require('sequelize');

const Reservas = dbConnection.define('reservas', {
    fechaInicio: {
        type: DataTypes.DATE,
        // allowNull: false
    },
    fechaFin: {
        type: DataTypes.DATE,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    salon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING,
    }
}, {
    timestamps: false
});

// Reservas.sync({alter: true}).then(() => {
//     console.log('Reservas table created');
// }).catch((error) => {
//     console.log('Hubo un error en crear la tabla',error);
// })

module.exports = Reservas;