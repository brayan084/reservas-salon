const { response } = require('express');
const Salon = require('../models/Salones');


const obtenerSalones = async (req, res = response) => {
    try {
        const salon = await Salon.findAll();
        res.json({
            salon
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'No hay Salones'
        })
    }
}

const obtenerSalon = async (req, res = response) => {

    const id = req.params.id;

    try {
        const salones = await Salon.findByPk(id);

        if(!salones) {
          return res.status(201).json({
            ok: false,
            message: 'Salon no encontrada'
          })
        } 

        res.json( salones );
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'No hay Salon'
        })
    }
}

const crearSalon = async (req, res = response) => {
    
    try {
        console.log(req.body)
        const salon = new Salon(req.body);
        await salon.save();
        res.json({
            salon
        })
    } catch (error) {
        console.log(error);
        res.status(400).json({
            msg: 'No se pudo crear la Salon'
        })
    }
}

module.exports = {
    crearSalon,
    obtenerSalon,
    obtenerSalones
}