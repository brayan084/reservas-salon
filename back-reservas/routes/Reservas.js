const { Router } = require('express')
const { obtenerReservas, obtenerReserva, crearReserva, actualizarReserva, eliminarReserva } = require('../controllers/Reservas')


const router = Router();

router.get('/', obtenerReservas);
router.get('/:id', obtenerReserva);
router.post('/', crearReserva);
router.put('/:id', actualizarReserva);
router.delete('/:id', eliminarReserva);

module.exports = router;