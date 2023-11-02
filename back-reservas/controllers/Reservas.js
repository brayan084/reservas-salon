const { response } = require('express');
const { dbConnection } = require('../config/database');
const Reservas = require('../models/Reservas');
const moment = require('moment');


const obtenerReservas = async (req, res = response) => {
    try {
        const _Reservas = await Reservas.findAll();
        res.json({
            _Reservas
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'No hay Reservas'
        })
    }
}

const obtenerReserva = async (req, res = response) => {

    const id = req.params.id;

    try {
        const _Reserva = await Reservas.findByPk(id);

        if (!_Reserva) {
            return res.status(201).json({
                ok: false,
                message: 'Reserva no encontrada'
            })
        }

        res.json(_Reserva);
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'No hay Reserva'
        })
    }
}

const crearReserva = async (req, res = response) => {


    try {

        console.log(req.body)

        const q = `
        SELECT fechaInicio, fechaFin
        FROM Reservas
        WHERE (:fechaInicio <= fechaFin AND :fechaFin >= fechaInicio)
          AND salon = :salon
      `;

        const reservaExistente = await dbConnection.query(q, {
            replacements: {
                fechaInicio: req.body.fechaInicio,
                fechaFin: req.body.fechaFin,
                salon: req.body.salon
            },
            type: dbConnection.QueryTypes.SELECT
        });

        console.log(reservaExistente);

        if (reservaExistente.length > 0) {
            // Si ya existe una reserva en el mismo salón y en la misma fecha y hora, retornar un mensaje de error
            return res.status(500).json({
                msg: 'Ya existe una reserva en el mismo salón en la misma fecha y hora'
            });
        }

        const reservas = await Reservas.findAll();

        // Verificar si hay alguna reserva existente que se superpone con la nueva reserva en el mismo salón y fecha
        const reservaExistenteConHoraAdicional = reservas.find((reserva) => {

            const fechaInicioExistente = moment(reserva.fechaInicio)
            const fechaFinExistente = moment(reserva.fechaFin).add(1, 'hour');

            const fechaInicioNueva = moment(req.body.fechaInicio);
            const fechaFinNueva = moment(req.body.fechaFin);

            return (
                fechaInicioNueva.isSameOrBefore(fechaFinExistente) &&
                fechaFinNueva.isSameOrAfter(fechaInicioExistente) &&
                reserva.salon === req.body.salon
            );
        });

        if (reservaExistenteConHoraAdicional) {
            // Si ya existe una reserva en el mismo salón y en la misma fecha y hora, retornar un mensaje de error
            return res.status(500).json({
                msg: 'recuerda que se debe esperar una hora adicional despues de que termine la reserva anterior'
            });
        }

        const nuevaReserva = new Reservas(req.body);
        await nuevaReserva.save();

        res.json({
            msg: 'Reserva creada exitosamente'
        });

    } catch (error) {
        console.log(error);
        console.log('soy el catch');
        res.status(400).json({ msg: 'No se pudo crear la Reserva' });
    }
}


const actualizarReserva = async (req, res = response) => {
    try {
      const { id } = req.params;
      const reservaExistente = await Reservas.findOne({
        where: {
          id: id
        }
      });
    
      if (!reservaExistente) {
        return res.status(404).json({
          msg: 'No se encontró la reserva'
        });
      }
  
      const reservas = await Reservas.findAll();
      console.log(reservas);
  
      const reservaSolapada = reservas.find((reserva) => {
        if (reserva.id === id) {
          return false; // Ignorar la reserva actual al comparar con las demás reservas
        }
  
        const fechaInicioExistente = moment(reserva.fechaInicio)
        const fechaFinExistente = moment(reserva.fechaFin).add(1, 'hour');
  
        const fechaInicioNueva = moment(req.body.fechaInicio);
        const fechaFinNueva = moment(req.body.fechaFin);
  
        return (
          fechaInicioNueva.isSameOrBefore(fechaFinExistente) &&
          fechaFinNueva.isSameOrAfter(fechaInicioExistente) &&
          reserva.salon === req.body.salon
        );
      });
  
      if (reservaSolapada) {
        return res.status(400).json({
          msg: 'La reserva se solapa con otra reserva existente'
        });
      }
  
      // Actualizar la reserva existente con los nuevos datos de req.body
      reservaExistente.fechaInicio = req.body.fechaInicio;
      reservaExistente.fechaFin = req.body.fechaFin;
      // Actualizar otros campos según sea necesario
  
      await reservaExistente.save();
  
      res.json({
        msg: 'Reserva actualizada exitosamente'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Error al actualizar la reserva'
      });
    }
  };

const eliminarReserva = async (req, res = response) => {


    try {
        const id = req.params.id;
        await Reservas.destroy({ where: { id: id } });

        res.json({
            id
        })
    } catch (error) {
        console.log(error);
        res.status(404).json({
            msg: 'No se pudo eliminar la Reserva'
        })
    }

}

module.exports = {
    obtenerReservas,
    obtenerReserva,
    crearReserva,
    actualizarReserva,
    eliminarReserva
}