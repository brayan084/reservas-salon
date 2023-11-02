const { Router } = require('express')
const { obtenerSalon, obtenerSalones, crearSalon } = require('../controllers/Salon')


const router = Router();

router.get('/', obtenerSalones);
router.get('/:id', obtenerSalon);
router.post('/', crearSalon);
// router.put('/:id', actualizarReserva);
// router.delete('/:id', eliminarReserva);

module.exports = router;