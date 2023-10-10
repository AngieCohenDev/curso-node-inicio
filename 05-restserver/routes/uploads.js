const {Router} = require('express');
const {check} = require('express-validator'); 

const {ValidarCampos, validarArchivoSubir} = require('../middlewares/');
const { cargarArchivo, actualizarImagen, mostrarImagen } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers/db-validators');


const router = Router();

router.post('/',validarArchivoSubir, cargarArchivo);

router.put('/:coleccion/:id', [
    validarArchivoSubir,
    check('id', 'Debe ser un Mongo ID').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    ValidarCampos
], actualizarImagen  );

router.get('/:coleccion/:id',[
    check('id', 'Debe ser un Mongo ID').isMongoId(),
    check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
    ValidarCampos
], mostrarImagen);

module.exports = router;