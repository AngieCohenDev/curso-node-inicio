const {Router} = require('express');
const {check} = require('express-validator'); 

const {ValidarCampos} = require('../middlewares/validar_campos');
const { cargarArchivo, actualizarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');

const router = Router();

router.post('/', cargarArchivo);

router.put('/:coleccion/:id', [
    check('id', 'Debe ser un Mongo ID').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    ValidarCampos
], actualizarImagen  );

module.exports = router;