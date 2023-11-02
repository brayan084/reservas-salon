const { dbConnection } = require('../config/database'); 
const { DataTypes } = require('sequelize');

const Salones = dbConnection.define('Salones', {

    salon: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ubicacion: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descripccion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    max_person: {
        type: DataTypes.INTEGER,
        // allowNull: false
    },
    imagen: {
        type: DataTypes.STRING,
        defaultValue: "https://www.salsarte.com.ar/wp-content/uploads/2020/02/salon-eventos-le-caprice-06.jpg"
    }
}, {
    timestamps: false
});

// Salones.sync({alter: true}).then(() => {
//     console.log('Salon table created');
// }).catch((error) => {
//     console.log('Hubo un error en crear la tabla',error);
// })

module.exports = Salones;